-- Atualizar senha do usuário admin com hash correto para "123456"
-- Hash gerado com bcrypt para "123456": $2b$10$V/Yk6.QjKOJ8xo8Bz0qJjONQ8ZV7ZJ8YzXGzJ3o3Kf4K8FgF8XGmK
UPDATE public.system_users 
SET password_hash = '$2b$10$V/Yk6.QjKOJ8xo8Bz0qJjONQ8ZV7ZJ8YzXGzJ3o3Kf4K8FgF8XGmK'
WHERE username = 'admin';