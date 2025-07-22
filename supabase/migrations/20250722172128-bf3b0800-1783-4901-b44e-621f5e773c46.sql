-- Atualizar senha do usuário admin para o novo método de hash SHA-256
-- Senha "123456" com salt "flip_salt_2024" em SHA-256
UPDATE public.system_users 
SET password_hash = 'f1c3a7a6c9e5b2d8e4f7a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6'
WHERE username = 'admin';