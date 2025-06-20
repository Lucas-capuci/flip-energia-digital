
-- Add status column to budget_requests table if it doesn't exist
ALTER TABLE public.budget_requests 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'novo';

-- Create table to store lead status history
CREATE TABLE public.lead_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.budget_requests(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  observation TEXT,
  changed_by TEXT, -- Could be user email or name
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.lead_status_history ENABLE ROW LEVEL SECURITY;

-- Create policies for lead_status_history
CREATE POLICY "Authenticated users can view lead status history" 
  ON public.lead_status_history 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create lead status history" 
  ON public.lead_status_history 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_lead_status_history_lead_id ON public.lead_status_history(lead_id);
CREATE INDEX idx_lead_status_history_created_at ON public.lead_status_history(created_at);

-- Create function to automatically create status history when lead status changes
CREATE OR REPLACE FUNCTION public.create_lead_status_history()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create status history
CREATE TRIGGER trigger_lead_status_history
  AFTER INSERT OR UPDATE OF status ON public.budget_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.create_lead_status_history();
