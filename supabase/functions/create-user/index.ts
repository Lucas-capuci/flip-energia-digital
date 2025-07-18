
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Função para hash de senha usando Web Crypto API (mais confiável no Deno)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'flip_salt_2024') // adiciona salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { username, password, full_name, email, is_active } = await req.json()
    
    console.log('Creating user with data:', { username, full_name, email, is_active })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verificar se username já existe
    const { data: existingUser, error: checkError } = await supabaseClient
      .from('system_users')
      .select('id')
      .eq('username', username)
      .maybeSingle()

    console.log('Existing user check:', { exists: !!existingUser, error: checkError })

    if (existingUser) {
      console.log('Username already exists')
      return new Response(
        JSON.stringify({ success: false, message: 'Nome de usuário já existe' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Hash da senha usando Web Crypto API
    let password_hash
    try {
      password_hash = await hashPassword(password)
      console.log('Password hashed successfully with Web Crypto API')
    } catch (hashError) {
      console.error('Error hashing password:', hashError)
      return new Response(
        JSON.stringify({ success: false, message: 'Erro ao processar senha' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    // Criar usuário
    const { data: user, error } = await supabaseClient
      .from('system_users')
      .insert({
        username,
        password_hash,
        full_name,
        email: email || null,
        is_active: is_active ?? true,
      })
      .select()
      .single()

    console.log('User creation result:', { user: user ? 'created' : 'failed', error })

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ success: false, message: 'Erro ao criar usuário no banco de dados' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    console.log('User created successfully with id:', user.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Usuário criado com sucesso',
        user_id: user.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('General error creating user:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Erro interno do servidor' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
