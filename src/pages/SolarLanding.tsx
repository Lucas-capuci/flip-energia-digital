
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SolarLanding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [exitingStep, setExitingStep] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [billValue, setBillValue] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priority, setPriority] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const totalSteps = 5;

  const firstName = name.split(' ')[0];

  const billLabels: Record<string, string> = {
    '1': 'R$ 600 - R$ 900',
    '2': 'R$ 900 - R$ 1.200',
    '3': 'R$ 1.200 - R$ 2.500',
    '4': 'Acima de R$ 2.500',
  };

  const goToStep = (next: number) => {
    setExitingStep(currentStep);
    setTimeout(() => {
      setExitingStep(null);
      setCurrentStep(next);
    }, 500);
  };

  const handleNextStep = (stepIndex: number) => {
    if (stepIndex === 1 && !name.trim()) { nameRef.current?.focus(); return; }
    if (stepIndex === 2 && !whatsapp.trim()) { phoneRef.current?.focus(); return; }
    if (stepIndex === 3 && !billValue) return;
    goToStep(stepIndex + 1);
  };

  const handlePhoneMask = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const match = digits.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    if (!match) return value;
    return !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
  };

  const finishForm = async (selectedPriority: string) => {
    setPriority(selectedPriority);
    setSubmitting(true);

    try {
      const services = ['Solar'];

      const priorityLabels: Record<string, string> = {
        'sim': 'Sim, é prioridade!',
        'interessante': 'É interessante, porém não urgente',
        'nao_urgente': 'Não é urgente',
      };

      await supabase.from('budget_requests').insert({
        name: name.trim(),
        phone: whatsapp.trim(),
        email: '',
        property_type: propertyType,
        services,
        budget: billLabels[billValue] || '',
        description: `Prioridade: ${priorityLabels[selectedPriority] || selectedPriority}`,
        status: 'novo',
      });

      // Envia o lead para o CRM externo via edge function (não bloqueia o fluxo)
      try {
        const { data: crmData, error: crmError } = await supabase.functions.invoke('send-lead-to-crm', {
          body: {
            nome: name.trim(),
            telefone: whatsapp.trim(),
            email: '',
            conta_luz: billLabels[billValue] || '',
            tipo_imovel: propertyType,
            prioridade: selectedPriority === 'sim' ? 'sim' : 'nao',
            origem: 'landing_page',
            status: 'proposta',
          },
        });

        if (crmError || !(crmData as any)?.success) {
          console.error('Falha ao enviar lead ao CRM:', crmError || crmData);
          toast.warning('Recebemos seus dados, mas houve um atraso na sincronização.');
        } else {
          toast.success('Lead enviado para o CRM!');
        }
      } catch (crmErr) {
        console.error('Erro ao chamar send-lead-to-crm:', crmErr);
      }

      // Meta Pixel - dispara conversão de Lead ao finalizar o formulário
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Energia Solar - Landing',
          content_category: propertyType,
          value: 1,
          currency: 'BRL',
        });
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Formulário Energia Solar',
        });
      }
    } catch (e) {
      console.error('Erro ao salvar:', e);
    }

    setSubmitting(false);
    goToStep(6); // final
  };

  useEffect(() => {
    if (currentStep === 1) nameRef.current?.focus();
    if (currentStep === 2) phoneRef.current?.focus();
  }, [currentStep]);

  const progressPercent = currentStep > 0 && currentStep <= totalSteps ? (currentStep / totalSteps) * 100 : 0;
  const showProgress = currentStep > 0 && currentStep <= totalSteps;

  const stepClass = (step: number) => {
    if (exitingStep === step) return 'step exit';
    if (currentStep === step) return 'step active';
    return 'step';
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
        .solar-landing {
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #0a0a0f;
          color: #ffffff;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .solar-landing .bg-glow-landing {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }
        .solar-landing .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }
        .solar-landing .orb-1 {
          width: 600px;
          height: 600px;
          background: #4a00e0;
          top: -100px;
          left: -100px;
          animation: float 10s infinite alternate;
        }
        .solar-landing .orb-2 {
          width: 500px;
          height: 500px;
          background: #8e2de2;
          bottom: -100px;
          right: -100px;
          animation: float 12s infinite alternate-reverse;
        }
        .solar-landing .grid-overlay-landing {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.05;
          z-index: 1;
        }
        .solar-landing .landing-container {
          position: relative;
          z-index: 10;
          width: 800px;
          max-width: 95%;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .solar-landing .progress-container-landing {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 600px;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .solar-landing .progress-container-landing.visible {
          opacity: 1;
        }
        .solar-landing .progress-track-landing {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .solar-landing .progress-fill-landing {
          height: 100%;
          background: linear-gradient(135deg, #7F00FF 0%, #E100FF 100%);
          box-shadow: 0 0 10px rgba(225,0,255,0.5);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .solar-landing .step-indicator-landing {
          text-align: right;
          font-size: 14px;
          color: #a0a0a0;
          margin-bottom: 10px;
        }
        .solar-landing .step {
          display: none;
          width: 100%;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }
        .solar-landing .step.active {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }
        .solar-landing .step.exit {
          display: flex;
          opacity: 0;
          transform: translateY(-20px);
        }
        .solar-landing h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 24px;
          background: linear-gradient(to right, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }
        .solar-landing h2 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 40px;
          color: #ffffff;
        }
        .solar-landing .desc {
          font-size: 18px;
          color: #a0a0a0;
          margin-bottom: 40px;
          line-height: 1.6;
          max-width: 600px;
        }
        .solar-landing .input-group-landing {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin-bottom: 30px;
        }
        .solar-landing .input-group-landing input,
        .solar-landing .input-group-landing select {
          width: 100%;
          padding: 20px 25px;
          font-size: 24px;
          color: #ffffff;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          outline: none;
          transition: all 0.3s ease;
        }
        .solar-landing .input-group-landing input:focus,
        .solar-landing .input-group-landing select:focus {
          border-color: #E100FF;
          box-shadow: 0 0 20px rgba(225,0,255,0.2);
          background: rgba(255,255,255,0.08);
        }
        .solar-landing .input-group-landing select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 20px center;
        }
        .solar-landing .input-group-landing select option {
          background: #1a1a2e;
          color: #fff;
        }
        .solar-landing .floating-label-landing {
          position: absolute;
          left: 25px;
          top: 22px;
          font-size: 24px;
          color: #a0a0a0;
          pointer-events: none;
          transition: 0.3s ease all;
          background: transparent;
        }
        .solar-landing .input-group-landing input:focus ~ .floating-label-landing,
        .solar-landing .input-group-landing input:not(:placeholder-shown) ~ .floating-label-landing {
          top: -12px;
          left: 20px;
          font-size: 14px;
          color: #E100FF;
          background: #0a0a0f;
          padding: 0 5px;
        }
        .solar-landing .radio-group-landing {
          display: flex;
          gap: 20px;
          width: 100%;
          max-width: 600px;
          justify-content: center;
        }
        .solar-landing .radio-card-landing {
          flex: 1;
          position: relative;
        }
        .solar-landing .radio-card-landing input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .solar-landing .radio-label-landing {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 100%;
        }
        .solar-landing .radio-label-landing .icon {
          font-size: 32px;
          margin-bottom: 15px;
          color: #a0a0a0;
          transition: color 0.3s ease;
        }
        .solar-landing .radio-label-landing span {
          font-size: 18px;
          font-weight: 600;
        }
        .solar-landing .radio-card-landing input:checked + .radio-label-landing {
          border-color: #E100FF;
          background: rgba(225,0,255,0.1);
          box-shadow: 0 0 20px rgba(225,0,255,0.2);
        }
        .solar-landing .radio-card-landing input:checked + .radio-label-landing .icon {
          color: #E100FF;
        }
        .solar-landing .btn-primary-landing {
          background: linear-gradient(135deg, #7F00FF 0%, #E100FF 100%);
          color: white;
          border: none;
          padding: 18px 48px;
          font-size: 20px;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(225,0,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .solar-landing .btn-primary-landing:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(225,0,255,0.5);
        }
        .solar-landing .btn-primary-landing:active {
          transform: translateY(1px);
        }
        .solar-landing .btn-primary-landing:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .solar-landing .btn-next-landing {
          margin-top: 20px;
          min-width: 180px;
          justify-content: center;
        }
        .solar-landing .logo-landing {
          position: absolute;
          top: 40px;
          left: 50px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .solar-landing .logo-icon-landing {
          font-size: 28px;
          color: #E100FF;
        }
        .solar-landing .logo-text-landing {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
        }
        .solar-landing .enter-hint-landing {
          margin-top: 20px;
          font-size: 14px;
          color: #a0a0a0;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .solar-landing .enter-key-landing {
          border: 1px solid #a0a0a0;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
        }
        @media (max-width: 768px) {
          .solar-landing h1 { font-size: 28px; }
          .solar-landing h2 { font-size: 22px; margin-bottom: 24px; }
          .solar-landing .desc { font-size: 15px; }
          .solar-landing .input-group-landing input,
          .solar-landing .input-group-landing select { font-size: 18px; padding: 16px 20px; }
          .solar-landing .floating-label-landing { font-size: 18px; top: 18px; left: 20px; }
          .solar-landing .radio-group-landing { flex-direction: column; }
          .solar-landing .logo-landing { top: 20px; left: 20px; }
          .solar-landing .progress-container-landing { top: 30px; max-width: 85%; }
        }
      `}</style>

      <div className="solar-landing">
        <div className="bg-glow-landing">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="grid-overlay-landing"></div>
        </div>

        <div className="logo-landing">
          <img src="/lovable-uploads/128626de-5c4d-45a6-a710-143c406139e6.png" alt="FLIP Engenharia" style={{ height: '40px', width: 'auto' }} />
        </div>

        <div className={`progress-container-landing ${showProgress ? 'visible' : ''}`}>
          <div className="step-indicator-landing">Passo {Math.min(currentStep, totalSteps)} de {totalSteps}</div>
          <div className="progress-track-landing">
            <div className="progress-fill-landing" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="landing-container">
          {/* INTRO */}
          <div className={stepClass(0)}>
            <h1>Economize até 95% na sua conta de luz</h1>
            <p className="desc">Vamos te fazer algumas perguntas rápidas para calcular sua economia personalizada com energia solar.</p>
            <button className="btn-primary-landing" onClick={() => goToStep(1)}>
              Começar →
            </button>
          </div>

          {/* STEP 1: NAME */}
          <div className={stepClass(1)}>
            <h2>Como podemos te chamar?</h2>
            <div className="input-group-landing">
              <input
                ref={nameRef}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNextStep(1)}
                placeholder=" "
              />
              <label className="floating-label-landing">Seu nome completo</label>
            </div>
            <button className="btn-primary-landing btn-next-landing" onClick={() => handleNextStep(1)}>
              OK ✓
            </button>
            <div className="enter-hint-landing">pressione <span className="enter-key-landing">Enter ↵</span></div>
          </div>

          {/* STEP 2: WHATSAPP */}
          <div className={stepClass(2)}>
            <h2>Prazer, {firstName}! Qual seu WhatsApp?</h2>
            <p className="desc" style={{ fontSize: '14px', marginBottom: '30px' }}>Enviaremos o estudo de viabilidade por lá.</p>
            <div className="input-group-landing">
              <input
                ref={phoneRef}
                type="tel"
                value={whatsapp}
                onChange={e => setWhatsapp(handlePhoneMask(e.target.value))}
                onKeyDown={e => e.key === 'Enter' && handleNextStep(2)}
                placeholder=" "
              />
              <label className="floating-label-landing">(00) 00000-0000</label>
            </div>
            <button className="btn-primary-landing btn-next-landing" onClick={() => handleNextStep(2)}>
              OK ✓
            </button>
            <div className="enter-hint-landing">pressione <span className="enter-key-landing">Enter ↵</span></div>
          </div>

          {/* STEP 3: BILL VALUE */}
          <div className={stepClass(3)}>
            <h2>Qual o valor médio da sua conta de luz?</h2>
            <div className="input-group-landing">
              <select
                value={billValue}
                onChange={e => {
                  setBillValue(e.target.value);
                  setTimeout(() => handleNextStep(3), 300);
                }}
              >
                <option value="" disabled>Selecione um valor</option>
                <option value="1">R$ 600 - R$ 900</option>
                <option value="2">R$ 900 - R$ 1.200</option>
                <option value="3">R$ 1.200 - R$ 2.500</option>
                <option value="4">Acima de R$ 2.500</option>
              </select>
            </div>
            <button className="btn-primary-landing btn-next-landing" onClick={() => handleNextStep(3)}>
              OK ✓
            </button>
          </div>

          {/* STEP 4: PROPERTY TYPE */}
          <div className={stepClass(4)}>
            <h2>Qual o tipo do imóvel?</h2>
            <div className="radio-group-landing">
              <div className="radio-card-landing">
                <input
                  type="radio"
                  name="propertyType"
                  id="residencial"
                  value="residencial"
                  checked={propertyType === 'residencial'}
                  onChange={() => {
                    setPropertyType('residencial');
                    setTimeout(() => goToStep(5), 300);
                  }}
                />
                <label className="radio-label-landing" htmlFor="residencial">
                  <span className="icon">🏠</span>
                  <span>Residencial</span>
                </label>
              </div>
              <div className="radio-card-landing">
                <input
                  type="radio"
                  name="propertyType"
                  id="comercial"
                  value="comercial"
                  checked={propertyType === 'comercial'}
                  onChange={() => {
                    setPropertyType('comercial');
                    setTimeout(() => goToStep(5), 300);
                  }}
                />
                <label className="radio-label-landing" htmlFor="comercial">
                  <span className="icon">🏪</span>
                  <span>Comercial</span>
                </label>
              </div>
              <div className="radio-card-landing">
                <input
                  type="radio"
                  name="propertyType"
                  id="agro"
                  value="agro/rural"
                  checked={propertyType === 'agro/rural'}
                  onChange={() => {
                    setPropertyType('agro/rural');
                    setTimeout(() => goToStep(5), 300);
                  }}
                />
                <label className="radio-label-landing" htmlFor="agro">
                  <span className="icon">🌾</span>
                  <span>Agro/Rural</span>
                </label>
              </div>
            </div>
          </div>

          {/* STEP 5: PRIORITY */}
          <div className={stepClass(5)}>
            <h2>Energia solar é prioridade para você?</h2>
            <div className="radio-group-landing" style={{ flexDirection: 'column', maxWidth: '500px' }}>
              <div className="radio-card-landing">
                <input
                  type="radio"
                  name="priority"
                  id="priority-yes"
                  value="sim"
                  checked={priority === 'sim'}
                  onChange={() => finishForm('sim')}
                  disabled={submitting}
                />
                <label className="radio-label-landing" htmlFor="priority-yes" style={{ flexDirection: 'row', gap: '15px', padding: '20px 25px' }}>
                  <span className="icon" style={{ marginBottom: 0 }}>🔥</span>
                  <span>Sim, é prioridade!</span>
                </label>
              </div>
              <div className="radio-card-landing">
                <input
                  type="radio"
                  name="priority"
                  id="priority-maybe"
                  value="interessante"
                  checked={priority === 'interessante'}
                  onChange={() => finishForm('interessante')}
                  disabled={submitting}
                />
                <label className="radio-label-landing" htmlFor="priority-maybe" style={{ flexDirection: 'row', gap: '15px', padding: '20px 25px' }}>
                  <span className="icon" style={{ marginBottom: 0 }}>🤔</span>
                  <span>É interessante, porém não urgente</span>
                </label>
              </div>
              <div className="radio-card-landing">
                <input
                  type="radio"
                  name="priority"
                  id="priority-no"
                  value="nao_urgente"
                  checked={priority === 'nao_urgente'}
                  onChange={() => finishForm('nao_urgente')}
                  disabled={submitting}
                />
                <label className="radio-label-landing" htmlFor="priority-no" style={{ flexDirection: 'row', gap: '15px', padding: '20px 25px' }}>
                  <span className="icon" style={{ marginBottom: 0 }}>⏳</span>
                  <span>Não é urgente</span>
                </label>
              </div>
            </div>
          </div>

          {/* FINAL */}
          <div className={stepClass(6)}>
            <div style={{ fontSize: '64px', color: '#E100FF', marginBottom: '20px' }}>✅</div>
            <h1>Cálculo Concluído!</h1>
            <p className="desc">Recebemos seus dados. Um de nossos especialistas em energia solar entrará em contato pelo WhatsApp em instantes com sua proposta personalizada.</p>
            <button className="btn-primary-landing" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
              Voltar ao site
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarLanding;
