import React from 'react';
import { Star, Clock, Sparkles, CheckCircle2, Heart, MessageSquare } from 'lucide-react';
import { PhotoSlot } from './PhotoSlot';

interface SocialProofProps {
  onOpenSchedule: () => void;
  onOpenChat: () => void;
}

export const SocialProof: React.FC<SocialProofProps> = ({
  onOpenSchedule,
  onOpenChat,
}) => {
  const testimonials = [
    {
      quote: 'Não só ganhei dentes bonitos — ganhei coragem de sorrir de novo. Fazer minhas facetas com a Dra. Edilene mudou minha vida profissional e pessoal.',
      author: 'Juliana Mendes de Castro',
      neighborhood: 'Bairro Bauxita, Mariana - MG',
      procedure: 'Facetas em Porcelana',
      date: 'Setembro 2026',
      rating: 5,
    },
    {
      quote: 'A confiança que senti aqui não encontrei em nenhum outro lugar. Tinha pavor de dor para colocar implantes e foi super tranquilo. Mastigo tudo normalmente.',
      author: 'Carlos Eduardo Nogueira',
      neighborhood: 'Centro Histórico, Mariana - MG',
      procedure: 'Implante Dentário Guiado',
      date: 'Outubro 2026',
      rating: 5,
    },
    {
      quote: 'Minha mãe tratou aqui nos anos 90 e agora eu e meus filhos também somos pacientes fiéis. Tradição com tecnologia de ponta.',
      author: 'Mariana Peixoto Álvares',
      neighborhood: 'Bairro Colina, Mariana - MG',
      procedure: 'Ortodontia & Clareamento',
      date: 'Agosto 2026',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#121212] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#d4b874]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#d4b874]" />
            Prova Social de Mariana - MG
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-4">
            Milhares de Sorrisos Transformados
          </h2>
          
          <p className="text-base text-[#e5e5e5] leading-relaxed italic">
            "Famílias de Mariana sabem: o melhor caminho é a Edilene Andrade."
          </p>
        </div>

        {/* Google Reviews Banner & Photo Slot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* 5-Star Badge Card */}
          <div className="lg:col-span-5 luxury-card p-6 sm:p-8 bg-gradient-to-br from-[#1a1a1a] to-[#141414] border border-[#d4b874]/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#d4b874] font-semibold">
                Avaliação dos Pacientes
              </span>
              <span className="px-2 py-0.5 rounded bg-[#64b5a6]/20 text-[#64b5a6] text-[11px] font-bold">
                Google 4.9 ★★★★★
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-display text-5xl font-extrabold text-[#ffffff]">
                4.9
              </span>
              <div className="flex flex-col">
                <div className="flex text-[#d4b874] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4b874]" />
                  ))}
                </div>
                <span className="text-xs text-[#9ca3af] mt-0.5">
                  Mais de 380 avaliações verificadas
                </span>
              </div>
            </div>

            <p className="text-xs text-[#e5e5e5] leading-relaxed mb-6 font-light">
              Pacientes reais de bairros tradicionais como Bauxita, Colina, Santo Antônio e Centro Histórico comprovam o acolhimento, pontualidade e resultados duradouros.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
              <div className="w-9 h-9 rounded-full bg-[#202020] border border-[#d4b874]/40 flex items-center justify-center text-[#d4b874]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#ffffff]">Atendimento Humanizado</div>
                <div className="text-[11px] text-[#9ca3af]">Você nunca é apenas mais um número</div>
              </div>
            </div>
          </div>

          {/* Photo Slot: Patients smiling / 5 star seal */}
          <div className="lg:col-span-7">
            <PhotoSlot
              label="fotos de pacientes sorrindo ou selo 5 estrelas"
              tagText="[COLOQUE AQUI: fotos de pacientes sorrindo ou selo 5 estrelas]"
              alt="Pacientes felizes e sorridentes na Clínica Edilene Andrade"
              aspectRatio="video"
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80"
              overlayBadge="Selo 5 Estrelas Google"
            />
          </div>

        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="luxury-card p-6 bg-[#181818] flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#d4b874] gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4b874]" />
                  ))}
                </div>

                <p className="text-sm text-[#e5e5e5] italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#242424]">
                <div className="font-semibold text-xs text-[#ffffff]">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#d4b874]">
                  {t.neighborhood}
                </div>
                <div className="text-[10px] text-[#9ca3af] mt-0.5 flex items-center justify-between">
                  <span>Tratamento: {t.procedure}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency & Limited Appointments Callout */}
        <div className="bg-gradient-to-r from-[#1c1c1c] via-[#201d18] to-[#1c1c1c] border border-[#d4b874]/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874] shrink-0 mt-1">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#d4b874] text-[#121212] uppercase tracking-wider mb-2">
                  ⏳ Vagas Limitadas da Semana
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#ffffff] mb-1">
                  "Atendimento personalizado significa vagas limitadas. Garanta o seu horário."
                </h3>
                <p className="text-xs sm:text-sm text-[#d1d5db] font-light max-w-2xl">
                  Para garantir a dedicação total da Dra. Edilene e equipe sem correria, atendemos um número controlado de novos pacientes por semana em Mariana.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenSchedule}
                className="btn-gold cursor-pointer w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>Garantir Meu Horário</span>
              </button>
              
              <button
                onClick={onOpenChat}
                className="btn-outline-gold cursor-pointer w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar Vagas</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
