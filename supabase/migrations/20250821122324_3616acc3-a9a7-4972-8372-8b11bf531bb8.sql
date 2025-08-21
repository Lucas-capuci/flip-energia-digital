-- Fix security warnings by setting search_path for all functions

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Fix create_lead_status_history function
CREATE OR REPLACE FUNCTION public.create_lead_status_history()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Only create history if status actually changed
  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) OR TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_status_history (lead_id, status, observation, changed_by)
    VALUES (
      NEW.id, 
      NEW.status, 
      CASE 
        WHEN TG_OP = 'INSERT' THEN 'Lead criado'
        ELSE 'Status alterado'
      END,
      'Sistema'
    );
  END IF;
  RETURN NEW;
END;
$function$;