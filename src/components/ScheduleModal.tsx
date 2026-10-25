import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, MessageCircle, Mail, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import { db } from '../services/db';
import { Appointment } from '../types';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProcedure?: string;
  onOpenAuth: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  defaultProcedure,
  onOpenAuth,
}) => {
  const [procedure, setProcedure] = useState<string>(defaultProcedure || 'Implantes Dentários sem Dor');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [remindWhatsApp, setRemindWhatsApp] = useState<boolean>(true);
  const [remindEmail, setRemindEmail] = useState<boolean>(true);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentUser = db.getCurrentUser();

  // Set default minimum date (tomorrow)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // If tomorrow is Sunday, skip to Monday
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    setDate(minDateStr);
  }, []);

  // Update procedure if prop changes
  useEffect(() => {
    if (defaultProcedure) {
      setProcedure(defaultProcedure);
    }
  }, [defaultProcedure]);

  // Autofill user info if logged in
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.nome);
      setPhone(currentUser.telefone);
      setEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  // Calculate available slots when date changes
  useEffect(() => {
    if (date) {
      const slots = db.getAvailableSlots(date);
      setAvailableSlots(slots);
      if (slots.length > 0 && (!time || !slots.includes(time))) {
        setTime(slots[0]);
      }
    }
  }, [date, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !phone || !date || !time || !procedure) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const userId = currentUser ? currentUser.id : `guest-${Date.now()}`;

    const newBooking = db.createAppointment({
      usuario_id: userId,
      nome_paciente: name,
      telefone_paciente: phone,
      email_paciente: email,
      procedimento: procedure,
      data: date,
      horario: time,
      observacoes: notes,
      lembreteWhatsApp: remindWhatsApp,
      lembreteEmail: remindEmail,
    });

    setConfirmedBooking(newBooking);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  const formatWhatsAppMessage = () => {
    const msg = `Olá, Clínica Edilene Andrade! Confirmo o agendamento da minha avaliação de ${procedure} para o dia ${date.split('-').reverse().join('/')} às ${time}. Meu nome é ${name}.`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#181818] border border-[#d4b874]/60 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#1f1f1f] border-b border-[#2a2a2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#ffffff]">
                {confirmedBooking ? 'Agendamento Confirmado!' : 'Agendar Avaliação Personalizada'}
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Clínica Edilene Andrade • Mariana - MG • CRO-MG 19135
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262626] text-[#9ca3af] hover:text-[#ffffff] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {confirmedBooking ? (
            /* Confirmation View */
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#64b5a6]/20 border-2 border-[#64b5a6] text-[#64b5a6] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4b874] block mb-1">
                  Reserva Sincronizada com Sucesso
                </span>
                <h4 className="font-display text-2xl font-bold text-[#ffffff] mb-2">
                  Esperamos por você, {confirmedBooking.nome_paciente.split(' ')[0]}!
                </h4>
                <p className="text-xs text-[#9ca3af] max-w-md mx-auto leading-relaxed">
                  Sua consulta de avaliação foi registrada na nossa agenda oficial da clínica em Mariana.
                </p>
              </div>

              {/* Booking Ticket */}
              <div className="p-5 rounded-xl bg-[#141414] border border-[#d4b874]/40 text-left space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
                  <span className="text-xs text-[#9ca3af]">Procedimento:</span>
                  <span className="text-xs font-bold text-[#d4b874]">{confirmedBooking.procedimento}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
                  <span className="text-xs text-[#9ca3af]">Data & Horário:</span>
                  <span className="text-xs font-bold text-[#ffffff]">
                    {confirmedBooking.data.split('-').reverse().join('/')} às {confirmedBooking.horario}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
                  <span className="text-xs text-[#9ca3af]">Localização:</span>
                  <span className="text-xs text-[#e5e5e5] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4b874]" />
                    Rua Frei Durão, 45 - Centro Histórico, Mariana
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 text-[11px] text-[#64b5a6]">
                  <span>Status da vaga:</span>
                  <span className="font-semibold uppercase tracking-wider">Garantida & Confirmada</span>
                </div>
              </div>

              {/* Reminders Status */}
              <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-left space-y-2">
                <div className="font-semibold text-[#e5e5e5] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#64b5a6]" />
                  Canais de Lembrete Ativados:
                </div>
                {confirmedBooking.lembreteWhatsApp && (
                  <div className="text-[11px] text-[#9ca3af] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                    Lembrete por WhatsApp configurado para {confirmedBooking.telefone_paciente}
                  </div>
                )}
                {confirmedBooking.lembreteEmail && confirmedBooking.email_paciente && (
                  <div className="text-[11px] text-[#9ca3af] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4b874]"></span>
                    Confirmação e instruções enviadas para {confirmedBooking.email_paciente}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/5531988452121?text=${formatWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-aqua flex-1 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirmar no WhatsApp da Clínica</span>
                </a>

                <button
                  onClick={handleReset}
                  className="btn-outline-gold flex-1 cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Logged in indicator or invitation */}
              {currentUser ? (
                <div className="p-3 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">
                    Agendando como: <strong className="text-[#ffffff]">{currentUser.nome}</strong>
                  </span>
                  <span className="text-[11px] text-[#64b5a6] font-medium">
                    Paciente Cadastrado
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-[#221d14] border border-[#d4b874]/30 flex items-center justify-between text-xs">
                  <span className="text-[#d4b874]">
                    Já tem conta? Acesse para preenchimento automático.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuth();
                    }}
                    className="text-xs font-bold text-[#ffffff] underline hover:text-[#d4b874] cursor-pointer"
                  >
                    Entrar
                  </button>
                </div>
              )}

              {/* Procedure select */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b874] mb-1.5">
                  1. Procedimento Desejado *
                </label>
                <select
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all cursor-pointer"
                >
                  <option value="Implantes Dentários sem Dor">Implantes Dentários sem Dor (a partir de R$ 2.500)</option>
                  <option value="Facetas & Lentes de Contato">Facetas & Lentes de Contato (a partir de R$ 1.200)</option>
                  <option value="Ortodontia & Alinhadores Invisíveis">Ortodontia & Alinhadores (a partir de R$ 350/mês)</option>
                  <option value="Clareamento Dental a Laser">Clareamento Dental a Laser (a partir de R$ 600)</option>
                  <option value="Harmonização Orofacial">Harmonização Orofacial (a partir de R$ 400)</option>
                  <option value="Próteses Dentárias & Protocolo">Próteses Dentárias & Protocolo</option>
                  <option value="Avaliação Geral & Profilaxia">Avaliação Geral & Profilaxia Preventiva</option>
                </select>
              </div>

              {/* Date & Time selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b874] mb-1.5">
                    2. Escolha a Data *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                    required
                  />
                  <span className="text-[10px] text-[#9ca3af] mt-1 block">
                    Seg a Sex: 08:30 às 17:30
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4b874] mb-1.5">
                    3. Horários Disponíveis *
                  </label>
                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 bg-[#141414] rounded-xl border border-[#2d2d2d]">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            time === slot
                              ? 'bg-[#d4b874] text-[#121212] shadow-md scale-102'
                              : 'bg-[#1c1c1c] text-[#e5e5e5] hover:bg-[#282828] border border-[#2a2a2a]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#201414] border border-red-500/30 text-xs text-red-300">
                      Sem horários livres nesta data. Escolha outro dia.
                    </div>
                  )}
                </div>
              </div>

              {/* Patient details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ana Silva"
                    required
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    WhatsApp para Confirmação *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(31) 99999-9999"
                    required
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  E-mail (para receber resumo e orientações)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Alguma observação ou receio especial? (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Tenho sensibilidade ao frio, procuro atendimento sem dor..."
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2 text-xs text-[#ffffff] outline-none transition-all resize-none"
                />
              </div>

              {/* Reminders Checkboxes */}
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#2a2a2a] space-y-2">
                <span className="text-xs font-semibold text-[#d4b874] block">
                  Canais de Lembrete da Consulta:
                </span>
                
                <label className="flex items-center gap-2.5 text-xs text-[#e5e5e5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remindWhatsApp}
                    onChange={(e) => setRemindWhatsApp(e.target.checked)}
                    className="w-4 h-4 rounded text-[#d4b874] accent-[#d4b874] cursor-pointer"
                  />
                  <span>Enviar lembrete 24h antes pelo WhatsApp</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#e5e5e5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remindEmail}
                    onChange={(e) => setRemindEmail(e.target.checked)}
                    className="w-4 h-4 rounded text-[#d4b874] accent-[#d4b874] cursor-pointer"
                  />
                  <span>Enviar instruções de preparo por e-mail</span>
                </label>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-xs text-red-400 p-3 rounded-lg bg-red-950/40 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-gold w-full py-3 text-sm font-bold shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#121212]" />
                  <span>Confirmar e Garantir Minha Vaga</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
