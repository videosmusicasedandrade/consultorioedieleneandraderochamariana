import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, CheckCircle2, Calendar, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { db } from '../services/db';
import { PromoRedemption } from '../types';
import { PhotoSlot } from './PhotoSlot';

interface BirthdayPromoProps {
  onOpenSchedule: () => void;
  onOpenAuth: () => void;
}

export const BirthdayPromo: React.FC<BirthdayPromoProps> = ({
  onOpenSchedule,
  onOpenAuth,
}) => {
  const [currentUser, setCurrentUser] = useState(db.getCurrentUser());
  const [testMonth, setTestMonth] = useState<number>(new Date().getMonth() + 1);
  const [redeemed, setRedeemed] = useState<PromoRedemption | null>(null);
  const [selectedType, setSelectedType] = useState<'aniversario_clareamento' | 'aniversario_limpeza'>('aniversario_clareamento');

  useEffect(() => {
    const handleUpdate = () => {
      const user = db.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        const promos = db.getPromotionsByUser(user.id);
        if (promos.length > 0) {
          setRedeemed(promos[0]);
        }
      }
    };

    handleUpdate();
    window.addEventListener('database-updated', handleUpdate);
    return () => window.removeEventListener('database-updated', handleUpdate);
  }, []);

  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  // Calculate if user is birthday person this month
  const userBirthMonth = currentUser?.nascimento
    ? parseInt(currentUser.nascimento.split('-')[1], 10)
    : testMonth;

  const isEligible = userBirthMonth === currentMonth;

  const handleRedeem = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const newRedemption = db.redeemPromotion({
      usuario_id: currentUser.id,
      nome_paciente: currentUser.nome,
      tipo: selectedType,
    });
    setRedeemed(newRedemption);
  };

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <section id="aniversario" className="py-20 lg:py-28 bg-[#121212] relative overflow-hidden border-t border-[#262626]">
      {/* Golden halo glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#d4b874]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#d4b874]" />
            Campanha Exclusiva Mariana
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Promoção Aniversariante Sorridente
          </h2>
          <p className="text-base sm:text-lg text-[#d4b874] font-serif italic">
            "Seu dia especial merece um sorriso ainda mais brilhante."
          </p>
        </div>

        {/* Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Photo Slot */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#d4b874]/20 to-[#64b5a6]/20 blur-sm" />
              <div className="relative rounded-2xl overflow-hidden p-2 bg-[#191919] border border-[#2a2a2a]">
                <PhotoSlot
                  label="foto de sorriso feliz"
                  tagText="[COLOQUE AQUI: foto de sorriso feliz]"
                  alt="Sorriso feliz de aniversariante na Clínica Edilene Andrade"
                  aspectRatio="tall"
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=900&q=80"
                  overlayBadge="Vantagem de Aniversário"
                />
              </div>
            </div>
          </div>

          {/* Interactive Benefits & Voucher Box */}
          <div className="lg:col-span-7">
            <div className="luxury-card p-6 sm:p-8 bg-[#181818] border border-[#2e2e2e]">
              
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#282828]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#d4b874]/20 text-[#d4b874] flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9ca3af] block">Mês Atual:</span>
                    <span className="text-sm font-bold text-[#ffffff]">
                      {months[currentMonth - 1]} (Válido para nascidos em {months[currentMonth - 1]})
                    </span>
                  </div>
                </div>

                {/* Month simulator switcher */}
                <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
                  <span className="hidden sm:inline">Simular mês:</span>
                  <select
                    value={currentUser?.nascimento ? userBirthMonth : testMonth}
                    onChange={(e) => setTestMonth(Number(e.target.value))}
                    disabled={!!currentUser?.nascimento}
                    className="bg-[#121212] border border-[#333] text-xs text-[#d4b874] rounded px-2 py-1 outline-none cursor-pointer"
                  >
                    {months.map((m, idx) => (
                      <option key={idx} value={idx + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Benefits list */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141414] border border-[#262626]">
                  <CheckCircle2 className="w-5 h-5 text-[#64b5a6] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#ffffff] uppercase tracking-wide">
                      Desconto Especial de Aniversariante
                    </h4>
                    <p className="text-xs text-[#9ca3af]">
                      Condição exclusiva em clareamento dental a laser ou profilaxia profunda com ultrassom.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141414] border border-[#262626]">
                  <CheckCircle2 className="w-5 h-5 text-[#64b5a6] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#ffffff] uppercase tracking-wide">
                      Atendimento com Prioridade na Agenda
                    </h4>
                    <p className="text-xs text-[#9ca3af]">
                      Horários nobres reservados para você comemorar seu novo ciclo com sorriso radiante.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141414] border border-[#262626]">
                  <CheckCircle2 className="w-5 h-5 text-[#64b5a6] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#ffffff] uppercase tracking-wide">
                      Lembrancinha Exclusiva da Clínica
                    </h4>
                    <p className="text-xs text-[#9ca3af]">
                      Kit de cuidados bucais premium entregue com carinho pela Dra. Edilene.
                    </p>
                  </div>
                </div>
              </div>

              {/* Redeem State or Voucher */}
              {redeemed ? (
                <div className="p-5 rounded-2xl bg-[#141414] border border-[#d4b874] text-center space-y-3 animate-fade-in">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4b874]/20 text-[#d4b874] text-xs font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    Cupom de Aniversariante Ativo
                  </div>
                  
                  <div className="font-mono text-xl sm:text-2xl font-extrabold text-[#ffffff] tracking-wider py-2 bg-[#1b1b1b] rounded-lg border border-[#333]">
                    {redeemed.codigo_voucher}
                  </div>

                  <p className="text-xs text-[#9ca3af]">
                    Apresente este código na recepção ou mencione ao agendar sua consulta em Mariana.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={onOpenSchedule}
                      className="btn-gold cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Agendar Agora com Minha Vantagem</span>
                    </button>
                  </div>
                </div>
              ) : isEligible ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#9ca3af]">Escolha seu benefício:</span>
                    <label className="flex items-center gap-1 text-[#ffffff] cursor-pointer">
                      <input
                        type="radio"
                        name="promoChoice"
                        checked={selectedType === 'aniversario_clareamento'}
                        onChange={() => setSelectedType('aniversario_clareamento')}
                        className="accent-[#d4b874]"
                      />
                      Clareamento a Laser
                    </label>
                    <label className="flex items-center gap-1 text-[#ffffff] cursor-pointer">
                      <input
                        type="radio"
                        name="promoChoice"
                        checked={selectedType === 'aniversario_limpeza'}
                        onChange={() => setSelectedType('aniversario_limpeza')}
                        className="accent-[#d4b874]"
                      />
                      Profilaxia Completa
                    </label>
                  </div>

                  <button
                    onClick={handleRedeem}
                    className="btn-gold w-full py-3.5 text-sm font-bold shadow-xl cursor-pointer"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Resgatar Minha Vantagem de Aniversário</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#141414] border border-[#292929] text-xs text-[#9ca3af] flex items-center justify-between">
                  <span>
                    Seu aniversário é em outro mês? Cadastre-se para receber seu presente quando o seu mês chegar!
                  </span>
                  {!currentUser && (
                    <button
                      onClick={onOpenAuth}
                      className="btn-outline-gold py-1.5 px-3 text-xs shrink-0 ml-3 cursor-pointer"
                    >
                      Cadastrar
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
