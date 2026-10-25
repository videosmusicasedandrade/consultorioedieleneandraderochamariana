import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, User, ShieldCheck } from 'lucide-react';
import { db } from '../services/db';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  initialTopic?: string;
  onOpenSchedule: () => void;
  onOpenAuth: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  initialTopic,
  onOpenSchedule,
  onOpenAuth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = db.getCurrentUser();
  const currentUserId = currentUser ? currentUser.id : 'guest-visitor';
  const currentUserName = currentUser ? currentUser.nome : 'Visitante';

  const loadMessages = () => {
    const list = db.getMessagesByUser(currentUserId);
    setMessages(list);
  };

  useEffect(() => {
    loadMessages();
    window.addEventListener('database-updated', loadMessages);
    return () => window.removeEventListener('database-updated', loadMessages);
  }, [currentUserId]);

  useEffect(() => {
    if (initialTopic) {
      setIsOpen(true);
      setInputVal(initialTopic);
    }
  }, [initialTopic]);

  useEffect(() => {
    if (isOpen) {
      setHasNewNotification(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');

    // Save user message
    db.sendMessage({
      usuario_id: currentUserId,
      nome_usuario: currentUserName,
      telefone_usuario: currentUser?.telefone,
      mensagem: userText,
      remetente: 'usuario',
    });

    // Simulated warm clinic response after 1.2s if this is a visitor or first inquiry
    setTimeout(() => {
      let clinicReply = 'Que satisfação conversar com você! Nossa equipe em Mariana já está ciente da sua mensagem. Podemos agendar uma conversa acolhedora com a Dra. Edilene para você conhecer tudo sem compromisso.';
      
      const lower = userText.toLowerCase();
      if (lower.includes('implante')) {
        clinicReply = 'Sobre os implantes: trabalhamos com técnica guiada por computador e anestesia sem dor. A mastigação fica 100% firme e natural. Gostaria de garantir um horário de avaliação esta semana?';
      } else if (lower.includes('faceta') || lower.includes('lente')) {
        clinicReply = 'As facetas e lentes de contato entregam uma luminosidade impressionante e naturalidade incomparável! Fazemos o planejamento estético digital antes de qualquer intervenção.';
      } else if (lower.includes('clareamento')) {
        clinicReply = 'Nosso clareamento a laser tem protocolo exclusivo anti-sensibilidade, trazendo um brilho marcante com total conforto.';
      } else if (lower.includes('dor') || lower.includes('medo')) {
        clinicReply = 'Compreendemos perfeitamente. Há mais de 30 anos em Mariana, nosso maior diferencial é o cuidado maternal e tecnologia suave. Você estará nas melhores mãos!';
      }

      db.sendMessage({
        usuario_id: currentUserId,
        nome_usuario: 'Clínica Edilene Andrade',
        mensagem: clinicReply,
        remetente: 'clinica',
      });
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Fixed bottom right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && hasNewNotification && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1e1e] border border-[#d4b874]/60 shadow-xl text-xs text-[#d4b874] animate-flash-twice">
            <span className="w-2 h-2 rounded-full bg-[#64b5a6] animate-ping" />
            <span>Equipe Edilene Online</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#d4b874] to-[#f3dfa2] text-[#121212] shadow-[0_8px_30px_rgba(212,184,116,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Conversar com a Equipe Edilene"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#121212]" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 text-[#121212]" />
              {hasNewNotification && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#64b5a6] rounded-full border-2 border-[#121212] animate-flash-twice" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#181818] border border-[#d4b874]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1c1c1c] via-[#221e16] to-[#1c1c1c] border-b border-[#2d2d2d] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#64b5a6] rounded-full border-2 border-[#181818]" />
              </div>

              <div>
                <h4 className="font-display text-sm font-bold text-[#ffffff]">
                  Equipe Edilene Andrade
                </h4>
                <div className="text-[11px] text-[#64b5a6] flex items-center gap-1">
                  <span>Mariana - MG • CRO-MG 19135</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9ca3af] hover:text-[#ffffff] p-1 rounded-lg hover:bg-[#252525] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#141414]">
            
            {/* Required Clinic Greeting */}
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-[#64b5a6]/20 border border-[#64b5a6] flex items-center justify-center text-[#64b5a6] text-[10px] font-bold shrink-0 mt-1">
                EA
              </div>
              <div className="p-3 rounded-2xl rounded-tl-xs bg-[#64b5a6] text-[#121212] text-xs leading-relaxed font-medium shadow-md">
                Olá! Que alegria receber você. Como podemos cuidar do seu sorriso hoje?
              </div>
            </div>

            {/* Rendered user & clinic messages */}
            {messages.map((m) => {
              const isUser = m.remetente === 'usuario';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#64b5a6]/20 border border-[#64b5a6] flex items-center justify-center text-[#64b5a6] text-[10px] font-bold shrink-0 mt-1">
                      EA
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'rounded-tr-xs bg-[#d4b874] text-[#121212] font-semibold'
                        : 'rounded-tl-xs bg-[#64b5a6] text-[#121212] font-medium'
                    }`}
                  >
                    <p>{m.mensagem}</p>
                    <span className="text-[9px] opacity-75 mt-1 block text-right font-mono">
                      {new Date(m.data_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts */}
          <div className="p-2 bg-[#181818] border-t border-[#262626] flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => {
                setInputVal('Quero agendar uma avaliação sem dor para implante.');
              }}
              className="px-2.5 py-1 rounded-full bg-[#222] text-[#d4b874] border border-[#d4b874]/30 whitespace-nowrap hover:bg-[#2c2c2c] cursor-pointer"
            >
              Implantes
            </button>
            <button
              onClick={() => {
                setInputVal('Como funcionam as facetas em porcelana?');
              }}
              className="px-2.5 py-1 rounded-full bg-[#222] text-[#d4b874] border border-[#d4b874]/30 whitespace-nowrap hover:bg-[#2c2c2c] cursor-pointer"
            >
              Facetas
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenSchedule();
              }}
              className="px-2.5 py-1 rounded-full bg-[#64b5a6]/20 text-[#64b5a6] border border-[#64b5a6]/30 whitespace-nowrap hover:bg-[#64b5a6]/30 cursor-pointer font-bold"
            >
              📅 Agendar Vaga
            </button>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#1c1c1c] border-t border-[#282828] flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#141414] border border-[#333] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-3.5 py-2 text-xs text-[#ffffff] outline-none transition-all"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-9 h-9 rounded-xl bg-[#d4b874] text-[#121212] flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
