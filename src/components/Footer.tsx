import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Heart, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../services/db';

interface FooterProps {
  onOpenSchedule: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSchedule,
  onOpenAuth,
  onOpenAdmin,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = db.subscribeNewsletter(email, name);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setEmail('');
      setName('');
    } else {
      setStatus({ type: 'error', message: res.message });
    }

    setLoading(false);
  };

  return (
    <footer className="bg-[#0e0e0e] border-t border-[#222222] text-xs text-[#9ca3af] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Capture Section (Supabase Integrated) */}
        <div className="mb-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#181818] via-[#1f1c16] to-[#141414] border border-[#d4b874]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle golden ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4b874]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Newsletter text */}
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#d4b874]" />
                Newsletter da Clínica
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#ffffff] leading-tight">
                Receba Dicas Exclusivas de Saúde Bucal & Novidades
              </h3>

              <p className="text-xs sm:text-sm text-[#d1d5db] font-light leading-relaxed">
                Cadastre seu e-mail para receber orientações da Dra. Edilene Rocha, cuidados pós-procedimentos e avisos antecipados de vagas prioritárias na agenda de Mariana - MG.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-[#64b5a6] pt-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Respeitamos sua privacidade. Sem spam, apenas carinho e informação que transforma sorrisos.</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="lg:col-span-6">
              {status.type === 'success' ? (
                <div className="p-5 rounded-xl bg-[#141414] border border-[#64b5a6] text-center space-y-2 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-[#64b5a6]/20 text-[#64b5a6] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#ffffff]">
                    Inscrição Confirmada!
                  </h4>
                  <p className="text-xs text-[#d1d5db]">
                    {status.message}
                  </p>
                  <button
                    onClick={() => setStatus({ type: 'idle', message: '' })}
                    className="text-[11px] text-[#d4b874] hover:underline cursor-pointer pt-2"
                  >
                    Cadastrar outro e-mail
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Seu primeiro nome (opcional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#141414] border border-[#333] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-3 text-xs text-[#ffffff] outline-none transition-all placeholder:text-[#666]"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Seu melhor e-mail *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#141414] border border-[#333] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-3 text-xs text-[#ffffff] outline-none transition-all placeholder:text-[#666]"
                    />
                  </div>

                  {status.type === 'error' && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 p-2.5 rounded-lg bg-red-950/40 border border-red-500/30">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-3 text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4 text-[#121212]" />
                    <span>Quero Receber Dicas & Novidades</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Footer main columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1f1f1f]">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4b874] text-[#121212] flex items-center justify-center font-display font-bold text-lg shadow">
                EA
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#ffffff]">
                  Clínica Edilene Andrade
                </h3>
                <span className="text-[11px] text-[#d4b874]">
                  Odontologia de Excelência • Mariana - MG
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9ca3af] leading-relaxed max-w-sm">
              Mais de 30 anos transformando sorrisos e devolvendo a confiança de comer, falar e sorrir com liberdade. O melhor para você está aqui.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#64b5a6]">
              <ShieldCheck className="w-4 h-4" />
              <span>Responsável Técnica: Dra. Edilene Rocha de Andrade • CRO-MG 19135</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4b874]">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#autoridade" className="hover:text-[#ffffff] transition-colors">
                  Sobre a Dra. Edilene (+30 Anos)
                </a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#ffffff] transition-colors">
                  Implantes, Facetas e Procedimentos
                </a>
              </li>
              <li>
                <a href="#tour" className="hover:text-[#ffffff] transition-colors">
                  Tour Virtual pela Clínica
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-[#ffffff] transition-colors">
                  Simulador de Autoavaliação
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#ffffff] transition-colors">
                  Blog & Cuidados Pós-Procedimento
                </a>
              </li>
              <li>
                <a href="#aniversario" className="hover:text-[#ffffff] transition-colors">
                  Promoção Aniversariante Sorridente
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4b874]">
              Atendimento em Mariana
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4b874] mt-0.5 shrink-0" />
                <span>Rua Frei Durão, 45 - Centro Histórico, Mariana - MG, CEP 35420-000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#64b5a6] shrink-0" />
                <span>WhatsApp: (31) 98845-2121</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4b874] shrink-0" />
                <span>contato@clinicaedileneandrade.com.br</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSchedule}
                className="btn-gold py-2 px-4 text-xs font-bold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                <span>Garantir Vaga na Agenda</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & admin access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#737373]">
          <div>
            © {new Date().getFullYear()} Clínica Edilene Andrade. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAuth}
              className="hover:text-[#e5e5e5] transition-colors cursor-pointer"
            >
              Área do Paciente
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#d4b874] transition-colors cursor-pointer"
            >
              Acesso Clínico (Dra. Edilene)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
