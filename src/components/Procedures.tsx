import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { PhotoSlot } from './PhotoSlot';
import { Procedure } from '../types';

interface ProceduresProps {
  onSelectProcedure: (procedureName: string) => void;
  onOpenChatWithTopic: (topic: string) => void;
}

export const Procedures: React.FC<ProceduresProps> = ({
  onSelectProcedure,
  onOpenChatWithTopic,
}) => {
  const [filter, setFilter] = useState<'all' | 'transform' | 'align' | 'glow'>('all');

  const proceduresData: Procedure[] = [
    {
      id: 'implantes',
      nome: 'Implantes Dentários sem Dor',
      tagline: 'Fixação definitiva com tecnologia guiada',
      descricaoEmocional: 'Recupere o sorriso completo e a confiança de comer, falar e sorrir sem preocupação.',
      investimento: 'a partir de R$ 2.500',
      destaqueBadge: 'Mais Procurado',
      imagemAntes: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
      imagemDepois: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
      legendaAntes: '[COLOQUE AQUI: ANTES dente faltando]',
      legendaDepois: '[COLOQUE AQUI: DEPOIS sorriso completo]',
      beneficios: [
        'Mastigação firme como dentes naturais',
        'Preservação da estrutura óssea facial',
        'Anestesia de alta tecnologia sem desconforto',
      ],
    },
    {
      id: 'facetas',
      nome: 'Facetas & Lentes de Contato',
      tagline: 'O padrão ouro da estética dental moderna',
      descricaoEmocional: 'O brilho natural que faz você se destacar em cada foto com elegância.',
      investimento: 'a partir de R$ 1.200 por dente',
      destaqueBadge: 'Efeito Uau',
      imagemAntes: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      imagemDepois: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80',
      legendaAntes: '[COLOQUE AQUI: dentes com desgastes/manchas]',
      legendaDepois: '[COLOQUE AQUI: close-up de sorriso brilhante e alinhado]',
      beneficios: [
        'Planejamento digital do sorriso',
        'Porcelana ultra resistente e translúcida',
        'Cor natural personalizada ao seu tom',
      ],
    },
    {
      id: 'ortodontia',
      nome: 'Ortodontia & Alinhadores',
      tagline: 'Discrição, velocidade e alinhamento biomecânico',
      descricaoEmocional: 'Alinhe não só os dentes, mas a sua vida com mais sorrisos e autoconfiança.',
      investimento: 'a partir de R$ 350 mensais',
      destaqueBadge: 'Invisível & Confortável',
      imagemAntes: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      imagemDepois: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      legendaAntes: '[COLOQUE AQUI: ANTES tortos]',
      legendaDepois: '[COLOQUE AQUI: DEPOIS alinhados]',
      beneficios: [
        'Alinhadores transparentes e discretos',
        'Correção precisa da mordida e mastigação',
        'Acompanhamento mensal personalizado em Mariana',
      ],
    },
    {
      id: 'clareamento',
      nome: 'Clareamento Dental a Laser',
      tagline: 'Luminosidade pura sem agredir o esmalte',
      descricaoEmocional: 'Deixe seu sorriso tão brilhante quanto a sua alegria de viver.',
      investimento: 'a partir de R$ 600',
      destaqueBadge: 'Resultado Imediato',
      imagemAntes: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      imagemDepois: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      legendaAntes: '[COLOQUE AQUI: ANTES amarelados]',
      legendaDepois: '[COLOQUE AQUI: DEPOIS brancos]',
      beneficios: [
        'Protocolo anti-sensibilidade exclusivo',
        'Remoção de manchas de café e tempo',
        'Brilho radiante em poucas sessões',
      ],
    },
    {
      id: 'harmonizacao',
      nome: 'Harmonização Orofacial',
      tagline: 'Sutileza que realça seus traços únicos',
      descricaoEmocional: 'O equilíbrio que valoriza o seu melhor sorriso com sofisticação natural.',
      investimento: 'a partir de R$ 400',
      destaqueBadge: 'Harmonia & Rejuvenescimento',
      imagemAntes: '',
      imagemDepois: '',
      legendaAntes: '[COLOQUE AQUI: marcas de expressão iniciais]',
      legendaDepois: '[COLOQUE AQUI: rosto harmonizado, natural]',
      beneficios: [
        'Toxina botulínica preventiva e terapêutica',
        'Preenchimento labial sutil e hidratado',
        'Alívio de bruxismo e tensão mandibular',
      ],
    },
    {
      id: 'proteses',
      nome: 'Próteses Dentárias & Protocolos',
      tagline: 'Conforto, fixação e retorno da dignidade',
      descricaoEmocional: 'Volte a sorrir com tranquilidade e dignidade que você sempre mereceu.',
      investimento: 'valores conforme caso',
      destaqueBadge: 'Dignidade & Segurança',
      imagemAntes: '',
      imagemDepois: '',
      legendaAntes: '[COLOQUE AQUI: dificuldade mastigatória]',
      legendaDepois: '[COLOQUE AQUI: pessoa recuperando o sorriso]',
      beneficios: [
        'Próteses fixas sobre implantes (Protocolo Branemark)',
        'Adaptação anatômica perfeita sem machucar',
        'Materiais alemães de alta durabilidade',
      ],
    },
  ];

  return (
    <section id="procedimentos" className="py-20 lg:py-28 bg-[#161616] relative border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4b874]" />
            Procedimentos de Alta Transformação
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-4">
            O Sorriso Que Você Sempre Mereceu
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Aqui nós nunca vendemos um tratamento mecânico. Entregamos a liberdade de se expressar sem hesitar, mastigar com firmeza e voltar a amar cada foto.
          </p>
        </div>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proceduresData.map((proc) => (
            <div
              key={proc.id}
              className="luxury-card flex flex-col justify-between overflow-hidden p-5 sm:p-6 bg-[#1a1a1a]"
            >
              <div>
                {/* Header of card */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4b874] px-2.5 py-0.5 rounded-full bg-[#242424] border border-[#d4b874]/30">
                    {proc.destaqueBadge}
                  </span>
                  <span className="text-[11px] text-[#64b5a6] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Avaliação em Mariana
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#ffffff] mb-1 group-hover:text-[#d4b874] transition-colors">
                  {proc.nome}
                </h3>
                
                <p className="text-xs text-[#9ca3af] mb-4 font-mono">
                  {proc.tagline}
                </p>

                {/* Visual Before/After or PhotoSlot */}
                <div className="mb-5">
                  {proc.imagemAntes || proc.imagemDepois ? (
                    <BeforeAfterSlider
                      title={proc.nome}
                      beforePromptTag={proc.legendaAntes}
                      afterPromptTag={proc.legendaDepois}
                      beforeImgSrc={proc.imagemAntes}
                      afterImgSrc={proc.imagemDepois}
                    />
                  ) : (
                    <PhotoSlot
                      label={`${proc.legendaAntes} + ${proc.legendaDepois}`}
                      tagText={proc.legendaDepois}
                      alt={proc.nome}
                      aspectRatio="video"
                    />
                  )}
                </div>

                {/* Emotional Pitch */}
                <div className="p-3 rounded-lg bg-[#141414] border border-[#242424] mb-4">
                  <p className="text-xs text-[#e5e5e5] italic leading-relaxed">
                    "{proc.descricaoEmocional}"
                  </p>
                </div>

                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {proc.beneficios.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-[#d1d5db]">
                      <Check className="w-3.5 h-3.5 text-[#64b5a6] mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Investment & CTA */}
              <div className="pt-4 border-t border-[#262626]">
                <div className="mb-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#9ca3af] block">
                    Investimento
                  </span>
                  <span className="text-lg font-bold text-[#d4b874]">
                    {proc.investimento}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProcedure(proc.nome)}
                    className="btn-gold py-2 px-3 text-xs w-full cursor-pointer"
                  >
                    <span>Quero Este</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenChatWithTopic(proc.nome)}
                    className="btn-outline-gold py-2 px-3 text-xs w-full cursor-pointer"
                  >
                    <span>Tirar Dúvida</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#9ca3af] max-w-xl mx-auto">
            * Cada sorriso possui uma anatomia biológica única. O investimento exato e plano de tratamento detalhado são estabelecidos após exame clínico cuidadoso e escaneamento na clínica em Mariana - MG.
          </p>
        </div>

      </div>
    </section>
  );
};
