import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, MessageCircle, CheckCircle } from 'lucide-react';
import { db } from '../services/db';

interface SelfAssessmentQuizProps {
  onOpenChatWithDiagnosis: (procedureName: string, diagnosisSummary: string) => void;
  onOpenScheduleWithProcedure: (procedureName: string) => void;
}

export const SelfAssessmentQuiz: React.FC<SelfAssessmentQuizProps> = ({
  onOpenChatWithDiagnosis,
  onOpenScheduleWithProcedure,
}) => {
  const [step, setStep] = useState<number>(1);
  const [ans1, setAns1] = useState<string>('');
  const [ans2, setAns2] = useState<string>('');
  const [ans3, setAns3] = useState<string>('');
  const [result, setResult] = useState<{
    procedure: string;
    tagline: string;
    description: string;
    investment: string;
  } | null>(null);

  const calculateResult = (incomodo: string, sonho: string) => {
    let proc = 'Facetas & Lentes de Contato';
    let tag = 'Harmonia estética e brilho natural';
    let desc = 'Com base nas suas respostas, suas maiores oportunidades estão em transformar a textura, alinhamento visual e luminosidade dos seus dentes sem desgastes invasivos.';
    let inv = 'a partir de R$ 1.200 por dente';

    if (incomodo.includes('falta') || sonho.includes('recuperar')) {
      proc = 'Implantes Dentários sem Dor';
      tag = 'Recupere a mastigação e dentes fixos';
      desc = 'A reposição com técnica guiada trará de volta sua estabilidade mastigatória e o prazer de sorrir abertamente sem medo de próteses móveis.';
      inv = 'a partir de R$ 2.500';
    } else if (incomodo.includes('posição') || sonho.includes('alinhar')) {
      proc = 'Ortodontia & Alinhadores Invisíveis';
      tag = 'Alinhamento discreto e funcional';
      desc = 'Corrigir o posicionamento dos seus dentes vai desobstruir seu sorriso e proteger sua articulação com total conforto e rapidez.';
      inv = 'a partir de R$ 350 mensais';
    } else if (incomodo.includes('cor') || sonho.includes('brilhar')) {
      proc = 'Clareamento Dental a Laser';
      tag = 'Luminosidade pura e jovialidade';
      desc = 'Remover pigmentos profundos acumulados com protocolo anti-sensibilidade vai devolver o frescor e brilho que combinam com seu rosto.';
      inv = 'a partir de R$ 600';
    }

    const calculated = {
      procedure: proc,
      tagline: tag,
      description: desc,
      investment: inv,
    };
    setResult(calculated);

    // Save in DB
    const currentUser = db.getCurrentUser();
    db.saveQuizResponse({
      usuario_id: currentUser?.id,
      nome: currentUser?.nome,
      telefone: currentUser?.telefone,
      respostas: {
        escondeSorriso: ans1,
        incomodoPrincipal: incomodo,
        sonhoSorriso: sonho,
      },
      procedimento_sugerido: proc,
    });
  };

  const handleNext = () => {
    if (step === 1 && ans1) {
      setStep(2);
    } else if (step === 2 && ans2) {
      setStep(3);
    } else if (step === 3 && ans3) {
      calculateResult(ans2, ans3);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAns1('');
    setAns2('');
    setAns3('');
    setResult(null);
  };

  return (
    <section id="simulador" className="py-20 lg:py-28 bg-[#161616] border-y border-[#262626] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4b874]" />
            Simulador de Autoavaliação
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Descubra o Caminho Para o Seu Novo Sorriso
          </h2>
          <p className="text-sm text-[#9ca3af]">
            Responda 3 perguntas rápidas para entender qual tratamento melhor atende ao seu momento e objetivo.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="luxury-card p-6 sm:p-10 bg-[#1a1a1a] border border-[#2d2d2d] relative shadow-2xl">
          
          {/* Progress bar */}
          <div className="w-full bg-[#242424] h-1.5 rounded-full overflow-hidden mb-8">
            <div
              className="bg-gradient-to-r from-[#d4b874] to-[#64b5a6] h-full transition-all duration-500 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-[#9ca3af] font-medium">
                <span>Pergunta 1 de 3</span>
                <span className="text-[#d4b874]">Insegurança e Expressão</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#ffffff]">
                1. Você costuma esconder o sorriso ao falar ou tirar foto?
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'sempre', label: 'Sim, frequentemente coloco a mão na boca ou evito fotos abertas' },
                  { id: 'as_vezes', label: 'Às vezes, dependendo do ângulo ou da iluminação' },
                  { id: 'raramente', label: 'Não escondo, mas sinto que ele poderia ser muito mais bonito e harmônico' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAns1(opt.label)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      ans1 === opt.label
                        ? 'border-[#d4b874] bg-[#d4b874]/10 text-[#ffffff] shadow-md'
                        : 'border-[#2a2a2a] bg-[#141414] text-[#d1d5db] hover:border-[#d4b874]/50'
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      ans1 === opt.label ? 'border-[#d4b874] bg-[#d4b874]' : 'border-[#444]'
                    }`}>
                      {ans1 === opt.label && <div className="w-2 h-2 rounded-full bg-[#121212]" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  disabled={!ans1}
                  onClick={handleNext}
                  className="btn-gold disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Próxima Pergunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-[#9ca3af] font-medium">
                <span>Pergunta 2 de 3</span>
                <span className="text-[#d4b874]">Ponto de Desconforto</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#ffffff]">
                2. O que mais te incomoda hoje no seu sorriso?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Cor amarelada ou manchas que não saem', value: 'cor' },
                  { label: 'Formato, tamanho ou desgastes nos dentes', value: 'formato' },
                  { label: 'Posição torta, apinhamento ou mordida desalinhada', value: 'posição' },
                  { label: 'Falta de um ou mais dentes / dificuldade mastigatória', value: 'falta de dente' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAns2(opt.value)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      ans2 === opt.value
                        ? 'border-[#d4b874] bg-[#d4b874]/10 text-[#ffffff] shadow-md'
                        : 'border-[#2a2a2a] bg-[#141414] text-[#d1d5db] hover:border-[#d4b874]/50'
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      ans2 === opt.value ? 'border-[#d4b874] bg-[#d4b874]' : 'border-[#444]'
                    }`}>
                      {ans2 === opt.value && <div className="w-2 h-2 rounded-full bg-[#121212]" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline-gold py-2 px-4 text-xs cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  disabled={!ans2}
                  onClick={handleNext}
                  className="btn-gold disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Próxima Pergunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-[#9ca3af] font-medium">
                <span>Pergunta 3 de 3</span>
                <span className="text-[#d4b874]">Seu Sonho</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#ffffff]">
                3. Qual é o seu maior sonho para o seu sorriso?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Brilhar com dentes brancos e marcantes em fotos', value: 'brilhar' },
                  { label: 'Alinhar com discrição e sem aparelho metálico', value: 'alinhar' },
                  { label: 'Recuperar dentes fixos e mastigar sem preocupação', value: 'recuperar' },
                  { label: 'Manter a saúde impecável e prevenir problemas', value: 'manter' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAns3(opt.value)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      ans3 === opt.value
                        ? 'border-[#d4b874] bg-[#d4b874]/10 text-[#ffffff] shadow-md'
                        : 'border-[#2a2a2a] bg-[#141414] text-[#d1d5db] hover:border-[#d4b874]/50'
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      ans3 === opt.value ? 'border-[#d4b874] bg-[#d4b874]' : 'border-[#444]'
                    }`}>
                      {ans3 === opt.value && <div className="w-2 h-2 rounded-full bg-[#121212]" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="btn-outline-gold py-2 px-4 text-xs cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  disabled={!ans3}
                  onClick={handleNext}
                  className="btn-gold disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Ver Meu Diagnóstico Ideal</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && result && (
            <div className="space-y-6 animate-fade-in text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#2a2a2a]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#64b5a6]/20 text-[#64b5a6] text-xs font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Autoavaliação Concluída
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#9ca3af] hover:text-[#d4b874] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Refazer teste
                </button>
              </div>

              <div className="bg-[#141414] border border-[#d4b874]/50 rounded-2xl p-6 sm:p-8">
                <span className="text-xs uppercase tracking-wider text-[#d4b874] font-semibold block mb-1">
                  Procedimento Recomendado Para Você:
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#ffffff] mb-2">
                  {result.procedure}
                </h4>
                <p className="text-xs text-[#64b5a6] font-medium mb-4">
                  {result.tagline}
                </p>
                <p className="text-sm text-[#e5e5e5] leading-relaxed mb-6 font-light">
                  {result.description}
                </p>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] mb-6">
                  <span className="text-xs text-[#9ca3af]">Investimento estimado:</span>
                  <span className="text-sm font-bold text-[#d4b874]">{result.investment}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const summary = `Olá! Fiz a autoavaliação no site e meu resultado indicou ${result.procedure}. Gostaria de conversar com a equipe sobre o meu caso.`;
                      onOpenChatWithDiagnosis(result.procedure, summary);
                    }}
                    className="btn-gold flex-1 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quero Conversar Sobre Meu Caso</span>
                  </button>

                  <button
                    onClick={() => onOpenScheduleWithProcedure(result.procedure)}
                    className="btn-outline-gold flex-1 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Agendar Avaliação Clínica</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
