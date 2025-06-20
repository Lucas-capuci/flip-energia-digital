
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planejamento',
  start_date DATE NOT NULL,
  end_date DATE,
  value DECIMAL(12,2) NOT NULL DEFAULT 0,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (allowing all authenticated users to manage projects)
CREATE POLICY "Authenticated users can view projects" 
  ON public.projects 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create projects" 
  ON public.projects 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects" 
  ON public.projects 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects" 
  ON public.projects 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_type ON public.projects(type);
CREATE INDEX idx_projects_created_at ON public.projects(created_at);
