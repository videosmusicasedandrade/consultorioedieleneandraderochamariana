import React from 'react';
import { Sparkles, MessageCircle, ShieldCheck, Star, MapPin } from 'lucide-react';
import { PhotoSlot } from './PhotoSlot';

interface HeroProps {
  onOpenSchedule: () => void;
  onOpenChat: () => void;
  onExploreQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSchedule,
  onOpenChat,
  onExploreQuiz,
}) => {
  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#d4b874]/10 via-[#64b5a6]/5 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-[#d4b874]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Psychological Copy & Emotional Invitation */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#d4b874] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4b874]">
                Mariana - MG • Tradição & Tecnologia
              </span>
              <span className="text-[11px] text-[#9ca3af] hidden sm:inline">
                | CRO-MG 19135
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] leading-[1.18] font-bold text-[#ffffff] mb-6">
              Você não merece apenas um dentista.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b874] via-[#f3dfa2] to-[#d4b874] drop-shadow-sm">
                Você merece sorrir sem medo
              </span>
              , sem esconder, com orgulho do brilho que é seu.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#e5e5e5] leading-relaxed mb-8 max-w-2xl font-light">
              A <strong className="text-[#ffffff] font-semibold">Clínica Edilene Andrade</strong> é referência em transformar sorrisos em Mariana - MG há mais de 30 anos. Famílias inteiras confiam. O melhor para você está aqui.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenSchedule}
                className="btn-gold group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#121212] group-hover:rotate-12 transition-transform duration-300" />
                <span>Quero Meu Sorriso Perfeito</span>
              </button>

              <button
                onClick={onOpenChat}
                className="btn-outline-gold group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#d4b874] group-hover:scale-110 transition-transform duration-300" />
                <span>Falar com a Equipe Edilene</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 border-t border-[#262626] w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#d4b874]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#d4b874]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#ffffff]">+30 Anos</div>
                  <div className="text-[11px] text-[#9ca3af]">Em Mariana</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#64b5a6]/30 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-[#64b5a6] fill-[#64b5a6]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#ffffff]">4.9 Estrelas</div>
                  <div className="text-[11px] text-[#9ca3af]">Google Avaliações</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#d4b874]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#d4b874]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#ffffff]">Centro Histórico</div>
                  <div className="text-[11px] text-[#9ca3af]">Fácil Acesso</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Golden corner accents */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#d4b874] rounded-tl-xl pointer-events-none z-20" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#d4b874] rounded-br-xl pointer-events-none z-20" />

              <div className="luxury-card overflow-hidden p-2 bg-[#181818]">
                <PhotoSlot
                  label="foto de sorriso natural, brilhante e confiável"
                  tagText="[COLOQUE AQUI: foto de sorriso natural, brilhante e confiável]"
                  alt="Sorriso natural e confiante na Clínica Edilene Andrade Mariana MG"
                  aspectRatio="tall"
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80"
                  overlayBadge="Sorriso Transformado"
                />
              </div>

              {/* Floating diagnostic prompt card */}
              <div
                onClick={onExploreQuiz}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#1a1a1a]/95 backdrop-blur-md border border-[#d4b874]/60 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#ffffff] flex items-center gap-1">
                    Simulador de Autoavaliação
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#64b5a6] text-[#121212] font-semibold">
                      3 Perguntas
                    </span>
                  </div>
                  <div className="text-[11px] text-[#d4b874]">
                    Descubra o tratamento ideal para você →
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
