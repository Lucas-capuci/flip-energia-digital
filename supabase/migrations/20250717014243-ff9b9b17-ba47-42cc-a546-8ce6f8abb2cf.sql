-- Criação das tabelas para controle financeiro

-- Tabela de receitas
CREATE TABLE public.receitas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_receita TEXT NOT NULL CHECK (tipo_receita IN ('projeto', 'servico', 'venda', 'outro')),
  projeto_id UUID REFERENCES public.projects(id),
  cliente TEXT NOT NULL,
  categoria TEXT NOT NULL,
  valor DECIMAL(12,2) NOT NULL CHECK (valor > 0),
  forma_pagamento TEXT NOT NULL,
  data_entrada DATE NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de despesas
CREATE TABLE public.despesas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_despesa TEXT NOT NULL CHECK (tipo_despesa IN ('operacional', 'administrativa', 'projeto', 'marketing', 'manutencao', 'comercial', 'outro')),
  projeto_id UUID REFERENCES public.projects(id),
  fornecedor TEXT NOT NULL,
  categoria TEXT NOT NULL,
  valor DECIMAL(12,2) NOT NULL CHECK (valor > 0),
  forma_pagamento TEXT NOT NULL,
  data_saida DATE NOT NULL,
  tipo_custo TEXT NOT NULL CHECK (tipo_custo IN ('fixo', 'variavel')),
  eh_recorrente BOOLEAN NOT NULL DEFAULT false,
  frequencia TEXT CHECK (frequencia IN ('mensal', 'bimestral', 'trimestral', 'semestral', 'anual') OR frequencia IS NULL),
  duracao_meses INTEGER CHECK (duracao_meses > 0 OR duracao_meses IS NULL),
  indefinida BOOLEAN NOT NULL DEFAULT false,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para receitas
CREATE POLICY "Allow all operations on receitas" 
ON public.receitas 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Políticas RLS para despesas
CREATE POLICY "Allow all operations on despesas" 
ON public.despesas 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_receitas_updated_at
    BEFORE UPDATE ON public.receitas
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_despesas_updated_at
    BEFORE UPDATE ON public.despesas
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Função para processar despesas recorrentes
CREATE OR REPLACE FUNCTION public.processar_despesas_recorrentes()
RETURNS INTEGER AS $$
DECLARE
    despesa RECORD;
    nova_data DATE;
    processadas INTEGER := 0;
BEGIN
    FOR despesa IN 
        SELECT * FROM public.despesas 
        WHERE eh_recorrente = true 
        AND (indefinida = true OR 
             (duracao_meses IS NOT NULL AND 
              data_saida + INTERVAL '1 month' * duracao_meses > CURRENT_DATE))
    LOOP
        -- Calcular próxima data baseada na frequência
        CASE despesa.frequencia
            WHEN 'mensal' THEN nova_data := despesa.data_saida + INTERVAL '1 month';
            WHEN 'bimestral' THEN nova_data := despesa.data_saida + INTERVAL '2 months';
            WHEN 'trimestral' THEN nova_data := despesa.data_saida + INTERVAL '3 months';
            WHEN 'semestral' THEN nova_data := despesa.data_saida + INTERVAL '6 months';
            WHEN 'anual' THEN nova_data := despesa.data_saida + INTERVAL '1 year';
        END CASE;
        
        -- Verificar se já chegou a data da próxima recorrência
        IF nova_data <= CURRENT_DATE THEN
            -- Criar nova despesa recorrente
            INSERT INTO public.despesas (
                tipo_despesa, projeto_id, fornecedor, categoria, valor,
                forma_pagamento, data_saida, tipo_custo, eh_recorrente,
                frequencia, duracao_meses, indefinida, observacoes
            ) VALUES (
                despesa.tipo_despesa, despesa.projeto_id, despesa.fornecedor, 
                despesa.categoria, despesa.valor, despesa.forma_pagamento,
                nova_data, despesa.tipo_custo, despesa.eh_recorrente,
                despesa.frequencia, 
                CASE 
                    WHEN despesa.indefinida THEN NULL
                    ELSE despesa.duracao_meses - 1
                END,
                despesa.indefinida, 
                despesa.observacoes || ' (Recorrência automática)'
            );
            
            processadas := processadas + 1;
        END IF;
    END LOOP;
    
    RETURN processadas;
END;
$$ LANGUAGE plpgsql;