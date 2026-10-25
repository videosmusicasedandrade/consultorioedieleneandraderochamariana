import React, { useState } from 'react';
import { Compass, Eye, Sparkles, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PhotoSlot } from './PhotoSlot';

export const VirtualTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const stops = [
    {
      id: 'recepcao',
      title: 'Recepção Acolhedora',
      tag: '[COLOQUE AQUI: recepção arrumada e acolhedora]',
      desc: 'Ambiente climatizado, café mineiro especial e atendimento suave planejado para desacelerar seu ritmo e proporcionar paz.',
      badge: 'Conforto & Tranquilidade',
      img: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'consultorio',
      title: 'Sala de Atendimento & Tecnologia',
      tag: '[COLOQUE AQUI: sala de atendimento limpa e moderna]',
      desc: 'Equipamentos de escaneamento intraoral 3D, anestesia digital sem dor e protocolos estéreis de nível hospitalar.',
      badge: 'Odontologia Digital',
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'fachada',
      title: 'Entrada da Clínica em Mariana',
      tag: '[COLOQUE AQUI: entrada da clínica em Mariana]',
      desc: 'Localização privilegiada no Centro Histórico de Mariana, com arquitetura preservada, acessibilidade e fácil estacionamento.',
      badge: 'Centro Histórico Mariana',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'equipe',
      title: 'Boas-Vindas da Equipe',
      tag: '[COLOQUE AQUI: equipe recebendo alguém com sorriso]',
      desc: 'O calor humano de quem atende chamando pelo nome, ouvindo seus anseios e cuidando de cada detalhe com ternura.',
      badge: 'Atendimento Familiar',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section id="tour" className="py-20 lg:py-28 bg-[#161616] border-t border-[#262626] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#d4b874]" />
            Tour Virtual Interativo
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Entre Sem Sair de Casa
          </h2>
          <p className="text-base text-[#9ca3af] italic">
            "Veja onde vamos cuidar do seu sorriso."
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {stops.map((stop, idx) => (
            <button
              key={stop.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#d4b874] text-[#121212] shadow-lg scale-102'
                  : 'bg-[#1c1c1c] text-[#9ca3af] hover:text-[#ffffff] hover:bg-[#252525] border border-[#2b2b2b]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{stop.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Display */}
        <div className="luxury-card overflow-hidden bg-[#181818] border border-[#2d2d2d] p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Media */}
            <div className="lg:col-span-7">
              <PhotoSlot
                label={stops[activeTab].tag}
                tagText={stops[activeTab].tag}
                alt={stops[activeTab].title}
                aspectRatio="video"
                src={stops[activeTab].img}
                overlayBadge={stops[activeTab].badge}
              />
            </div>

            {/* Description & Feeling */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64b5a6] block mb-1">
                  Ambiente {activeTab + 1} de 4
                </span>
                <h3 className="font-display text-2xl font-bold text-[#ffffff] mb-3">
                  {stops[activeTab].title}
                </h3>
                <p className="text-sm text-[#d1d5db] leading-relaxed font-light">
                  {stops[activeTab].desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141414] border border-[#d4b874]/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#d4b874] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#e5e5e5] font-serif italic">
                    "Assim que você pisar aqui, vai sentir: está no lugar certo."
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                <MapPin className="w-4 h-4 text-[#d4b874]" />
                <span>Mariana - MG • Fácil acesso e conforto acústico</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
