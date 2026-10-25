import React, { useState, useEffect } from 'react';
import { Share2, Users, Gift, CheckCircle, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { db } from '../services/db';
import { Referral } from '../types';

interface ReferralProgramProps {
  onOpenAuth: () => void;
}

export const ReferralProgram: React.FC<ReferralProgramProps> = ({ onOpenAuth }) => {
  const [currentUser, setCurrentUser] = useState(db.getCurrentUser());
  const [referredName, setReferredName] = useState('');
  const [referredPhone, setReferredPhone] = useState('');
  const [relationship, setRelationship] = useState('Amigo(a)');
  const [userReferrals, setUserReferrals] = useState<Referral[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);

  const loadReferrals = () => {
    const user = db.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setUserReferrals(db.getReferralsByUser(user.id));
    }
  };

  useEffect(() => {
    loadReferrals();
    window.addEventListener('database-updated', loadReferrals);
    return () => window.removeEventListener('database-updated', loadReferrals);
  }, []);

  const attendedCount = userReferrals.filter((r) => r.status === 'atendido' || r.status === 'bonificado').length;
  const targetCount = 3;
  const progressPercent = Math.min((attendedCount / targetCount) * 100, 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!referredName.trim() || !referredPhone.trim()) return;

    db.createReferral({
      indicante_id: currentUser.id,
      nome_indicante: currentUser.nome,
      nome_indicado: referredName.trim(),
      telefone: referredPhone.trim(),
      relacao: relationship,
    });

    setReferredName('');
    setReferredPhone('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4500);
  };

  return (
    <section id="indicacoes" className="py-20 lg:py-28 bg-[#121212] border-t border-[#262626] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Share2 className="w-3.5 h-3.5 text-[#d4b874]" />
            Programa Sorriso Compartilhado
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Indique Quem Você Ama e Ganhe Juntos
          </h2>
          <p className="text-base text-[#d4b874] font-serif italic max-w-2xl mx-auto">
            "Quando você indica alguém, compartilha o melhor que conhece. E quem recebe também ganha."
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card: Quem Indica */}
          <div className="luxury-card p-6 sm:p-8 bg-[#181818] border border-[#2a2a2a] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874]">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#d4b874] font-semibold">
                  Para Você (Quem Indica)
                </span>
                <h3 className="font-display text-lg font-bold text-[#ffffff]">
                  3 Indicações Atendidas = Desconto em Manutenção
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
              Ao atingir 3 amigos ou familiares que realizarem avaliação ou procedimento, você recebe um benefício exclusivo em sua próxima manutenção periódica ou limpeza avançada.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#64b5a6]">
              <CheckCircle className="w-4 h-4" />
              <span>Acompanhe o status em tempo real no seu painel</span>
            </div>
          </div>

          {/* Card: Quem Chega */}
          <div className="luxury-card p-6 sm:p-8 bg-[#181818] border border-[#2a2a2a] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#64b5a6]/20 border border-[#64b5a6] flex items-center justify-center text-[#64b5a6]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#64b5a6] font-semibold">
                  Para o Seu Convidado (Quem Chega)
                </span>
                <h3 className="font-display text-lg font-bold text-[#ffffff]">
                  Avaliação Sem Custo + Atendimento Prioritário
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
              A pessoa indicada recebe uma recepção especial como convidada de honra da família da clínica, com escaneamento e conversa sem custo de avaliação inicial.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4b874]">
              <CheckCircle className="w-4 h-4" />
              <span>Prioridade na escolha de dias e horários</span>
            </div>
          </div>

        </div>

        {/* Progress Tracker (If user logged in) & Referral Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Progress Tracker */}
          <div className="lg:col-span-5 luxury-card p-6 sm:p-8 bg-[#1a1a1a]">
            <h4 className="font-display text-base font-bold text-[#ffffff] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4b874]" />
              Seu Progresso de Indicações
            </h4>

            {currentUser ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#9ca3af]">Indicações atendidas:</span>
                  <span className="text-sm font-bold text-[#d4b874]">{attendedCount} de {targetCount}</span>
                </div>

                <div className="w-full bg-[#121212] h-3 rounded-full overflow-hidden border border-[#282828] p-0.5">
                  <div
                    className="bg-gradient-to-r from-[#d4b874] to-[#64b5a6] h-full rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="text-[11px] text-[#9ca3af] leading-relaxed">
                  {attendedCount >= 3 ? (
                    <span className="text-[#64b5a6] font-semibold">
                      🎉 Parabéns! Você completou 3 indicações e liberou seu desconto especial em manutenção!
                    </span>
                  ) : (
                    <span>Faltam apenas {targetCount - attendedCount} indicação(ões) para liberar seu benefício.</span>
                  )}
                </div>

                {userReferrals.length > 0 && (
                  <div className="pt-4 border-t border-[#262626] space-y-2 max-h-48 overflow-y-auto">
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block font-semibold">
                      Últimas pessoas indicadas por você:
                    </span>
                    {userReferrals.map((ref) => (
                      <div key={ref.id} className="p-2.5 rounded-lg bg-[#141414] border border-[#262626] text-xs flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-[#ffffff]">{ref.nome_indicado}</div>
                          <div className="text-[10px] text-[#9ca3af]">{ref.relacao} • {ref.data.split('-').reverse().join('/')}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                          ref.status === 'atendido' ? 'bg-[#64b5a6]/20 text-[#64b5a6]' : 'bg-[#d4b874]/20 text-[#d4b874]'
                        }`}>
                          {ref.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-[#9ca3af]">
                  Crie sua conta ou faça login para acumular pontos de indicação e desbloquear seus benefícios em Mariana.
                </p>
                <button
                  onClick={onOpenAuth}
                  className="btn-outline-gold py-2 px-4 text-xs cursor-pointer"
                >
                  Entrar / Cadastrar
                </button>
              </div>
            )}
          </div>

          {/* Referral Submission Form */}
          <div className="lg:col-span-7 luxury-card p-6 sm:p-8 bg-[#181818]">
            <h4 className="font-display text-base font-bold text-[#ffffff] mb-1">
              Indicar um Amigo ou Familiar
            </h4>
            <p className="text-xs text-[#9ca3af] mb-6">
              Nossa equipe entrará em contato com carinho em nome de sua indicação.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Nome Completo do Indicado *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Roberto Alencar"
                  value={referredName}
                  onChange={(e) => setReferredName(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    WhatsApp do Indicado *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(31) 99999-9999"
                    value={referredPhone}
                    onChange={(e) => setReferredPhone(e.target.value)}
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    Grau de Relação *
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all cursor-pointer"
                  >
                    <option value="Amigo(a)">Amigo(a)</option>
                    <option value="Familiar / Parente">Familiar / Parente</option>
                    <option value="Colega de Trabalho">Colega de Trabalho</option>
                    <option value="Vizinho(a) em Mariana">Vizinho(a) em Mariana</option>
                    <option value="Cônjuge / Parceiro(a)">Cônjuge / Parceiro(a)</option>
                  </select>
                </div>
              </div>

              {successMsg && (
                <div className="p-3 rounded-xl bg-[#64b5a6]/20 border border-[#64b5a6]/40 text-xs text-[#64b5a6] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Indicação cadastrada com sucesso! Entraremos em contato com todo acolhimento.</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-gold w-full py-3 text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#121212]" />
                  <span>Compartilhar Este Cuidado</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
