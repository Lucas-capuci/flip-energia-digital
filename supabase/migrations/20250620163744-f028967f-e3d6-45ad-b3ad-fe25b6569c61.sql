
-- Fix RLS policies for lead_status_history table
DROP POLICY IF EXISTS "Authenticated users can view lead status history" ON public.lead_status_history;
DROP POLICY IF EXISTS "Authenticated users can create lead status history" ON public.lead_status_history;

-- Create more permissive policies since this is an admin system
CREATE POLICY "Allow all operations on lead status history" 
  ON public.lead_status_history 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Also ensure budget_requests table allows all operations  
DROP POLICY IF EXISTS "Enable read access for all users" ON public.budget_requests;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.budget_requests;
DROP POLICY IF EXISTS "Enable update for all users" ON public.budget_requests;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.budget_requests;

CREATE POLICY "Allow all operations on budget requests" 
  ON public.budget_requests 
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
