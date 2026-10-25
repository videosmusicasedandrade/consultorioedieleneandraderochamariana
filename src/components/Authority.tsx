import React from 'react';
import { Award, CheckCircle, HeartHandshake, Sparkles, Stethoscope, UserCheck } from 'lucide-react';
import { PhotoSlot } from './PhotoSlot';

interface AuthorityProps {
  onOpenSchedule: () => void;
}

export const Authority: React.FC<AuthorityProps> = ({ onOpenSchedule }) => {
  const credentials = [
    {
      title: 'Três décadas fazemos certo, sempre',
      desc: 'Mais de 30 anos de prática contínua, aperfeiçoamento e dedicação a famílias de Mariana e região.',
    },
    {
      title: 'CRO-MG 19135 em destaque',
      desc: 'Registro oficial do Conselho Regional de Odontologia, garantia de ética, rigor e excelência clínica.',
    },
    {
      title: 'Nas melhores mãos da cidade',
      desc: 'Equipe multidisciplinar em constante especialização, combinando acolhimento maternal com odontologia digital.',
    },
    {
      title: 'Tecnologia sem dor e humanizada',
      desc: 'Anestesia computadorizada de alta precisão, biossegurança nível hospitalar e conforto total.',
    },
  ];

  return (
    <section id="autoridade" className="py-20 lg:py-28 bg-[#121212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1b1b] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Autoridade & Tradição
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-4">
            Por Que Somos a Melhor Escolha em Mariana
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            A segurança de colocar o seu sorriso nas mãos de quem construiu uma história sólida de respeito, carinho e resultados definitivos.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Slot Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Outer decorative border */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#d4b874]/20 via-[#64b5a6]/20 to-transparent blur-md pointer-events-none" />
              
              <div className="relative rounded-2xl p-2 bg-[#191919] border border-[#2a2a2a]">
                <PhotoSlot
                  label="foto da Edilene ou equipe atendendo com carinho"
                  tagText="[COLOQUE AQUI: foto da Edilene ou equipe atendendo com carinho]"
                  alt="Dra. Edilene Andrade e equipe odontológica atendendo com carinho em Mariana"
                  aspectRatio="tall"
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80"
                  overlayBadge="CRO-MG 19135"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#1a1a1a] border border-[#d4b874]/60 rounded-xl p-4 shadow-xl max-w-xs">
                <p className="text-xs italic text-[#e5e5e5] mb-2 leading-relaxed font-serif">
                  "Cada paciente que senta nesta cadeira traz uma história e um sonho. Nosso compromisso é devolver a liberdade de sorrir."
                </p>
                <div className="text-[11px] font-bold text-[#d4b874]">
                  — Dra. Edilene Rocha de Andrade
                </div>
                <div className="text-[10px] text-[#64b5a6]">
                  Cirurgiã-Dentista • CRO-MG 19135
                </div>
              </div>
            </div>
          </div>

          {/* Text & Pillars Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            
            <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded bg-[#d4b874] text-[#121212] font-display text-sm font-bold uppercase tracking-wider">
                  CRO-MG 19135
                </span>
                <span className="text-sm font-semibold text-[#64b5a6] flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  Mais de 30 Anos de Dedicação
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#ffffff] mb-3">
                "Nas melhores mãos da cidade"
              </h3>

              <p className="text-sm sm:text-base text-[#e5e5e5] leading-relaxed mb-6 font-light">
                Em três décadas no coração de Mariana, a Clínica Edilene Andrade se tornou sinônimo de odontologia que cuida de verdade. Não tratamos apenas dentes: transformamos a autoimagem, o conforto ao mastigar e o brilho nos olhos ao sorrir.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentials.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#d4b874]/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#d4b874] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold text-[#ffffff] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenSchedule}
                className="btn-gold cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Agendar Minha Consulta de Avaliação</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
