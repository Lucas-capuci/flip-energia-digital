-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.update_tasks_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION generate_task_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER  
SET search_path = public
AS $$
BEGIN
  RETURN 'TK-' || LPAD(nextval('task_number_seq')::TEXT, 4, '0');
END;
$$;