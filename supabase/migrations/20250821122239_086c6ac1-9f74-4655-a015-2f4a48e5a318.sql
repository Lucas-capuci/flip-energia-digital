-- Fix task creation issues by ensuring sequence and function work properly
-- Reset the sequence if needed and ensure it exists
DROP SEQUENCE IF EXISTS task_number_seq CASCADE;
CREATE SEQUENCE task_number_seq START 1 INCREMENT 1;

-- Recreate the function to ensure it works correctly
CREATE OR REPLACE FUNCTION public.generate_task_number()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN 'TK-' || LPAD(nextval('task_number_seq')::TEXT, 4, '0');
END;
$function$;

-- Grant necessary permissions
GRANT USAGE ON SEQUENCE task_number_seq TO anon, authenticated;