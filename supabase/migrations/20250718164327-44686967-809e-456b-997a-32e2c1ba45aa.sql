-- Criar tabela de usuários do sistema
CREATE TABLE public.system_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de módulos/visualizações disponíveis
CREATE TABLE public.system_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_key TEXT NOT NULL UNIQUE,
  module_name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de permissões de usuário
CREATE TABLE public.user_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.system_users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.system_modules(id) ON DELETE CASCADE,
  can_view BOOLEAN NOT NULL DEFAULT false,
  can_create BOOLEAN NOT NULL DEFAULT false,
  can_edit BOOLEAN NOT NULL DEFAULT false,
  can_delete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Habilitar RLS
ALTER TABLE public.system_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (apenas usuários autenticados podem acessar)
CREATE POLICY "Allow all operations on system_users" 
ON public.system_users 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on system_modules" 
ON public.system_modules 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on user_permissions" 
ON public.user_permissions 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Inserir módulos padrão
INSERT INTO public.system_modules (module_key, module_name, description) VALUES
('dashboard', 'Dashboard', 'Painel principal com estatísticas'),
('leads', 'Gerenciamento de Leads', 'Visualizar e gerenciar leads'),
('contacts', 'Gerenciamento de Contatos', 'Visualizar e gerenciar contatos'),
('projects', 'Gerenciamento de Projetos', 'Visualizar e gerenciar projetos'),
('financial', 'Controle Financeiro', 'Visualizar e gerenciar finanças'),
('user_management', 'Gerenciamento de Usuários', 'Criar e gerenciar acessos de usuários'),
('proposals', 'Gerador de Propostas', 'Acesso ao gerador de propostas');

-- Criar usuário administrador padrão (senha: 123456)
INSERT INTO public.system_users (username, password_hash, full_name, email) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrador', 'admin@flip.com');

-- Dar todas as permissões para o usuário admin
INSERT INTO public.user_permissions (user_id, module_id, can_view, can_create, can_edit, can_delete)
SELECT 
  (SELECT id FROM public.system_users WHERE username = 'admin'),
  id,
  true,
  true,
  true,
  true
FROM public.system_modules;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_system_users_updated_at
BEFORE UPDATE ON public.system_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();