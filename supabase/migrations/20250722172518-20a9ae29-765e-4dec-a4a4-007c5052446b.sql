-- Atualizar senha do usuário admin para texto simples
UPDATE public.system_users 
SET password_hash = '123456'
WHERE username = 'admin';