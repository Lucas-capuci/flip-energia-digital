
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Função para hash de senha usando Web Crypto API (mesmo método usado na criação)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'flip_salt_2024') // mesmo salt usado na criação
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { username, password } = await req.json()
    
    console.log('Login attempt for username:', username)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Buscar usuário pelo username
    const { data: user, error: userError } = await supabaseClient
      .from('system_users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .maybeSingle()

    console.log('User query result:', { user: user ? 'found' : 'not found', error: userError })

    if (userError || !user) {
      console.log('User not found or error:', userError)
      return new Response(
        JSON.stringify({ success: false, message: 'Usuário não encontrado' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    // Verificar senha
    try {
      const hashedPassword = await hashPassword(password)
      const isValid = hashedPassword === user.password_hash
      
      console.log('Password verification result:', isValid)

      if (!isValid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Senha incorreta' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401,
          }
        )
      }

      // Retornar dados do usuário (sem a senha)
      const { password_hash, ...userWithoutPassword } = user

      return new Response(
        JSON.stringify({ 
          success: true, 
          user: userWithoutPassword 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } catch (hashError) {
      console.error('Hash verification error:', hashError)
      return new Response(
        JSON.stringify({ success: false, message: 'Erro na verificação da senha' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Erro interno do servidor' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
