// Edge Function: send-lead-to-crm
// Proxy para enviar leads ao CRM externo usando a secret CRM_API_KEY

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const CRM_ENDPOINT = 'https://yseiiexmqppffgyxfumz.supabase.co/functions/v1/receive-lead';

interface IncomingPayload {
  // Aceita várias variações de nome de campo do frontend
  nome?: string;
  name?: string;
  fullName?: string;

  telefone?: string;
  phone?: string;
  whatsapp?: string;

  email?: string;

  conta_luz?: string;
  energyBill?: string;
  valor_conta?: string;
  billValue?: string;

  tipo_imovel?: string;
  propertyType?: string;

  prioridade?: string;
  priority?: string;

  origem?: string;
  source?: string;

  status?: string;
}

function normalizePropertyType(value?: string): string {
  if (!value) return '';
  const v = value.toLowerCase().trim();
  if (v.includes('resid')) return 'residencial';
  if (v.includes('comerc')) return 'comercial';
  if (v.includes('indust')) return 'industrial';
  if (v.includes('rural') || v.includes('agro')) return 'rural';
  return v;
}

function normalizePriority(value?: string): string {
  if (!value) return 'nao';
  const v = value.toLowerCase().trim();
  if (v === 'sim' || v.includes('priorid')) return 'sim';
  return 'nao';
}

function normalizeContaLuz(value?: string): string {
  if (!value) return '';
  // Já está num formato amigável? mantém. Senão, gera slug.
  const slug = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\$/g, '$')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_$.]/g, '');
  return slug;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawKey = Deno.env.get('CRM_API_KEY');
    const apiKey = rawKey?.trim().replace(/^Bearer\s+/i, '').replace(/[\r\n]+/g, '');
    if (!apiKey) {
      console.error('CRM_API_KEY não configurada');
      return new Response(
        JSON.stringify({ success: false, error: 'CRM_API_KEY não configurada no servidor' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    console.log('CRM_API_KEY length:', apiKey.length);

    const body: IncomingPayload = await req.json().catch(() => ({}));

    const nome = (body.nome || body.name || body.fullName || '').toString().trim();
    const telefone = (body.telefone || body.phone || body.whatsapp || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const conta_luz = normalizeContaLuz(body.conta_luz || body.energyBill || body.valor_conta || body.billValue);
    const tipo_imovel = normalizePropertyType(body.tipo_imovel || body.propertyType);
    const prioridade = normalizePriority(body.prioridade || body.priority);
    const origem = (body.origem || body.source || 'landing_page').toString();
    const status = (body.status || 'proposta').toString();

    if (!nome || !telefone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Nome e telefone são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload = {
      nome,
      telefone,
      email,
      conta_luz,
      tipo_imovel,
      prioridade,
      origem,
      status,
    };

    console.log('Enviando lead ao CRM:', { ...payload, telefone: '***' });

    const crmResponse = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await crmResponse.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!crmResponse.ok) {
      console.error('Erro do CRM:', crmResponse.status, data);
      return new Response(
        JSON.stringify({ success: false, error: data?.error || `CRM retornou ${crmResponse.status}`, details: data }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lead enviado ao CRM com sucesso:', data?.id);

    return new Response(
      JSON.stringify({ success: true, id: data?.id, message: data?.message || 'Lead criado com sucesso' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Erro inesperado:', err?.message || err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Erro inesperado' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
