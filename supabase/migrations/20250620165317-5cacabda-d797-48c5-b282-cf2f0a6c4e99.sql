
-- Fix RLS policies for projects table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.projects;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.projects;
DROP POLICY IF EXISTS "Enable update for all users" ON public.projects;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.projects;

-- Create permissive policies for projects table
CREATE POLICY "Allow all operations on projects" 
  ON public.projects 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
