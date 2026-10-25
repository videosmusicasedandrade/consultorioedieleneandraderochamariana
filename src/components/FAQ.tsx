import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FAQProps {
  onOpenChat: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenChat }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Dói fazer os procedimentos?',
      a: 'Cuidamos para você sentir o máximo de conforto em cada segundo. Combinamos anestesia computadorizada sem picada perceptível, ambiente relaxante e muito carinho humano. O medo de dentista fica no passado: nossos pacientes costumam dizer que se surpreenderam com a tranquilidade.',
    },
    {
      q: 'É caro transformar o meu sorriso?',
      a: 'É um investimento que dura a vida toda na sua saúde mastigatória, segurança social e autoestima. Oferecemos condições facilitadas, parcelamento e planos sob medida que cabem no seu planejamento financeiro. Cuidar de si é um merecimento, não um custo.',
    },
    {
      q: 'Quanto tempo dura o tratamento?',
      a: 'Cada sorriso tem seu tempo biológico, e cada passo é conduzido com carinho e rapidez planejada. Procedimentos como clareamento levam poucas sessões; facetas podem ser concluídas em poucos dias; e implantes utilizam guias cirúrgicos de alta precisão que aceleram a cicatrização.',
    },
    {
      q: 'Como funciona a primeira consulta de avaliação na clínica em Mariana?',
      a: 'É um momento de acolhimento e escuta atenta. Sentamos para entender seus desejos e eventuais receios, realizamos o escaneamento digital e apresentamos fotos, previsões e opções de investimento sem compromisso, com total clareza e respeito.',
    },
    {
      q: 'A clínica aceita convênios ou somente particular?',
      a: 'Priorizamos a odontologia de alto padrão sem a limitação de materiais imposta por planos. No entanto, fornecemos toda a documentação comprobatória, recibos e relatórios clínicos necessários para você solicitar o reembolso integral ou parcial junto ao seu plano.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#161616] border-t border-[#262626] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Dúvidas Frequentes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Transparência Que Gera Confiança
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Respostas diretas e acolhedoras para as perguntas mais comuns de quem busca excelência odontológica em Mariana.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="luxury-card overflow-hidden bg-[#1a1a1a] border border-[#2b2b2b] transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-[#ffffff] flex items-center gap-3">
                    <span className="text-sm font-mono text-[#d4b874]">{`0${idx + 1}.`}</span>
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#242424] flex items-center justify-center text-[#d4b874] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#d4b874]/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#d1d5db] leading-relaxed border-t border-[#242424] animate-fade-in font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt to chat */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#141414] border border-[#2d2d2d]">
          <p className="text-xs sm:text-sm text-[#9ca3af] mb-4">
            Ainda tem alguma pergunta específica sobre o seu sorriso ou sua rotina?
          </p>
          <button
            onClick={onOpenChat}
            className="btn-outline-gold py-2 px-5 text-xs cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Falar Diretamente com Nossa Equipe</span>
          </button>
        </div>

      </div>
    </section>
  );
};
