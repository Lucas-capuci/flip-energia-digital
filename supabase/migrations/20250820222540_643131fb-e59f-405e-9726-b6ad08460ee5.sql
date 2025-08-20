-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'a_fazer' CHECK (status IN ('a_fazer', 'em_andamento', 'concluido', 'cancelado')),
  due_date DATE,
  responsible TEXT,
  priority TEXT NOT NULL DEFAULT 'B' CHECK (priority IN ('A', 'B', 'C')),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks
CREATE POLICY "Allow all operations on tasks" 
ON public.tasks 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_tasks_updated_at();

-- Create index for better performance
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_priority ON public.tasks(priority);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);

-- Create sequence for task numbers
CREATE SEQUENCE IF NOT EXISTS task_number_seq START 1;

-- Create function to generate task numbers
CREATE OR REPLACE FUNCTION generate_task_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TK-' || LPAD(nextval('task_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Insert tasks module
INSERT INTO public.system_modules (module_key, module_name, description) 
VALUES ('tasks', 'Tarefas', 'Gerenciamento de tarefas e atividades')
ON CONFLICT (module_key) DO NOTHING;