
-- Create table for lead follow-ups
CREATE TABLE public.lead_follow_ups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.budget_requests(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('call', 'email', 'whatsapp', 'meeting')),
  follow_up_date DATE NOT NULL,
  notes TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.lead_follow_ups ENABLE ROW LEVEL SECURITY;

-- Create policies for lead_follow_ups
CREATE POLICY "Authenticated users can view lead follow ups" 
  ON public.lead_follow_ups 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create lead follow ups" 
  ON public.lead_follow_ups 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update lead follow ups" 
  ON public.lead_follow_ups 
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete lead follow ups" 
  ON public.lead_follow_ups 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_lead_follow_ups_lead_id ON public.lead_follow_ups(lead_id);
CREATE INDEX idx_lead_follow_ups_follow_up_date ON public.lead_follow_ups(follow_up_date);
CREATE INDEX idx_lead_follow_ups_completed ON public.lead_follow_ups(completed);

-- Create trigger to update updated_at column
CREATE TRIGGER update_lead_follow_ups_updated_at
  BEFORE UPDATE ON public.lead_follow_ups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
