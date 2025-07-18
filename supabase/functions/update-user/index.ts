import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId, username, password, full_name, email, is_active } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verificar se username já existe (excluindo o próprio usuário)
    const { data: existingUser } = await supabaseClient
      .from('system_users')
      .select('id')
      .eq('username', username)
      .neq('id', userId)
      .single()

    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'Nome de usuário já existe' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    let updateData: any = {
      username,
      full_name,
      email: email || null,
      is_active: is_active ?? true,
    }

    // Se senha foi fornecida, fazer hash
    if (password) {
      const bcrypt = await import('https://deno.land/x/bcrypt@v0.4.1/mod.ts')
      updateData.password_hash = await bcrypt.hash(password)
    }

    // Atualizar usuário
    const { error } = await supabaseClient
      .from('system_users')
      .update(updateData)
      .eq('id', userId)

    if (error) throw error

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Usuário atualizado com sucesso'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Erro interno do servidor' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})