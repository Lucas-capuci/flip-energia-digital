-- Forçar a criação das despesas recorrentes para agosto
INSERT INTO public.despesas (
    tipo_despesa, projeto_id, fornecedor, categoria, valor, valor_total,
    forma_pagamento, data_saida, tipo_custo, eh_recorrente,
    frequencia, duracao_meses, indefinida, observacoes, status_pagamento
) VALUES 
(
    'administrativa', NULL, 'digital contabilidade', 'contabil', 759.00, 759.00, 'pix',
    '2025-08-24', 'fixo', true,
    'mensal', NULL, true, 
    'Recorrência automática',
    'pendente'
),
(
    'marketing', NULL, '1nort', 'Agência de Marketing', 1650.00, 1650.00, 'cartao_credito',
    '2025-09-10', 'fixo', true,
    'mensal', NULL, true, 
    'Recorrência automática',
    'pendente'
);