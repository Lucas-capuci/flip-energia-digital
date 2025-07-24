-- Adicionar campos para pagamento parcial de despesas
ALTER TABLE public.despesas 
ADD COLUMN valor_total NUMERIC,
ADD COLUMN valor_pago NUMERIC DEFAULT 0,
ADD COLUMN status_pagamento TEXT DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'parcial', 'pago')),
ADD COLUMN proxima_recorrencia DATE;

-- Atualizar dados existentes
UPDATE public.despesas 
SET valor_total = valor,
    valor_pago = valor,
    status_pagamento = 'pago'
WHERE eh_recorrente = false;

UPDATE public.despesas 
SET valor_total = valor,
    valor_pago = 0,
    status_pagamento = 'pendente'
WHERE eh_recorrente = true;

-- Função melhorada para processar despesas recorrentes
CREATE OR REPLACE FUNCTION public.processar_despesas_recorrentes()
RETURNS integer
LANGUAGE plpgsql
AS $function$
DECLARE
    despesa RECORD;
    nova_data DATE;
    processadas INTEGER := 0;
BEGIN
    FOR despesa IN 
        SELECT * FROM public.despesas 
        WHERE eh_recorrente = true 
        AND status_pagamento IN ('pago', 'parcial')
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
                tipo_despesa, projeto_id, fornecedor, categoria, valor, valor_total,
                forma_pagamento, data_saida, tipo_custo, eh_recorrente,
                frequencia, duracao_meses, indefinida, observacoes, status_pagamento
            ) VALUES (
                despesa.tipo_despesa, despesa.projeto_id, despesa.fornecedor, 
                despesa.categoria, despesa.valor, despesa.valor_total, despesa.forma_pagamento,
                nova_data, despesa.tipo_custo, despesa.eh_recorrente,
                despesa.frequencia, 
                CASE 
                    WHEN despesa.indefinida THEN NULL
                    ELSE GREATEST(despesa.duracao_meses - 1, 0)
                END,
                despesa.indefinida, 
                COALESCE(despesa.observacoes, '') || ' (Recorrência automática)',
                'pendente'
            );
            
            -- Atualizar próxima recorrência na despesa original
            UPDATE public.despesas 
            SET proxima_recorrencia = nova_data
            WHERE id = despesa.id;
            
            processadas := processadas + 1;
        END IF;
    END LOOP;
    
    RETURN processadas;
END;
$function$;