import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Gift, Share2, LogOut, CheckCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import { db } from '../services/db';
import { Appointment, Referral, PromoRedemption } from '../types';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onOpenSchedule: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  onOpenSchedule,
}) => {
  const [activeTab, setActiveTab] = useState<'consultas' | 'indicacoes' | 'aniversario' | 'perfil'>('consultas');
  const currentUser = db.getCurrentUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [promos, setPromos] = useState<PromoRedemption[]>([]);

  useEffect(() => {
    if (currentUser) {
      setAppointments(db.getAppointmentsByUser(currentUser.id));
      setReferrals(db.getReferralsByUser(currentUser.id));
      setPromos(db.getPromotionsByUser(currentUser.id));
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#181818] border border-[#d4b874]/60 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#1f1f1f] border-b border-[#2a2a2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874] font-display font-bold text-base">
              {currentUser.nome.charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#ffffff]">
                Área do Paciente • {currentUser.nome}
              </h3>
              <p className="text-xs text-[#64b5a6]">
                Família Clínica Edilene Andrade • Mariana - MG
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262626] text-[#9ca3af] hover:text-[#ffffff] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 p-1.5 bg-[#121212] border-b border-[#262626] text-xs">
          <button
            onClick={() => setActiveTab('consultas')}
            className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'consultas' ? 'bg-[#d4b874] text-[#121212] font-bold' : 'text-[#9ca3af] hover:text-[#ffffff]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Minhas Consultas</span>
            <span className="sm:hidden">Consultas</span>
          </button>
          
          <button
            onClick={() => setActiveTab('indicacoes')}
            className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'indicacoes' ? 'bg-[#d4b874] text-[#121212] font-bold' : 'text-[#9ca3af] hover:text-[#ffffff]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Indicações</span>
          </button>

          <button
            onClick={() => setActiveTab('aniversario')}
            className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'aniversario' ? 'bg-[#d4b874] text-[#121212] font-bold' : 'text-[#9ca3af] hover:text-[#ffffff]'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Aniversário</span>
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`py-2 px-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'perfil' ? 'bg-[#d4b874] text-[#121212] font-bold' : 'text-[#9ca3af] hover:text-[#ffffff]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Meu Perfil</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Consultas Tab */}
          {activeTab === 'consultas' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">
                  Histórico de Agendamentos
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSchedule();
                  }}
                  className="btn-gold py-1.5 px-3 text-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Novo Agendamento</span>
                </button>
              </div>

              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 rounded-xl bg-[#141414] border border-[#2a2a2a] space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-[#ffffff]">{apt.procedimento}</h4>
                          <div className="text-xs text-[#d4b874] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5" />
                            {apt.data.split('-').reverse().join('/')} às {apt.horario}
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                          apt.status === 'confirmado' ? 'bg-[#64b5a6]/20 text-[#64b5a6]' : 'bg-[#d4b874]/20 text-[#d4b874]'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      
                      <div className="text-[11px] text-[#9ca3af] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#64b5a6]" />
                        Clínica Edilene Andrade • Mariana - MG
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-[#9ca3af]">
                  Nenhuma consulta agendada no momento.
                </div>
              )}
            </div>
          )}

          {/* Indicações Tab */}
          {activeTab === 'indicacoes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#2a2a2a] text-xs">
                <span className="text-[#d4b874] font-semibold block mb-1">
                  Programa Sorriso Compartilhado
                </span>
                <p className="text-[#9ca3af]">
                  Total de indicações registradas: <strong>{referrals.length}</strong>
                </p>
              </div>

              {referrals.map((r) => (
                <div key={r.id} className="p-3.5 rounded-xl bg-[#141414] border border-[#262626] flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-[#ffffff]">{r.nome_indicado}</div>
                    <div className="text-[10px] text-[#9ca3af]">{r.relacao} • Tel: {r.telefone}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#64b5a6]/20 text-[#64b5a6]">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Aniversário Tab */}
          {activeTab === 'aniversario' && (
            <div className="space-y-4 text-xs">
              {promos.length > 0 ? (
                promos.map((p) => (
                  <div key={p.id} className="p-5 rounded-xl bg-[#141414] border border-[#d4b874] space-y-2">
                    <span className="text-[11px] text-[#d4b874] font-bold uppercase tracking-wider block">
                      Voucher de Aniversário Resgatado
                    </span>
                    <div className="font-mono text-xl font-bold text-[#ffffff] py-2 px-3 bg-[#1e1e1e] rounded">
                      {p.codigo_voucher}
                    </div>
                    <p className="text-[#9ca3af]">
                      Benefício: {p.tipo === 'aniversario_clareamento' ? 'Desconto em Clareamento Dental a Laser' : 'Profilaxia Completa com Ultrassom'}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#9ca3af]">
                  Você ainda não resgatou seu voucher deste ano. Veja a seção Promoção Aniversariante no site.
                </div>
              )}
            </div>
          )}

          {/* Perfil Tab */}
          {activeTab === 'perfil' && (
            <div className="p-4 rounded-xl bg-[#141414] border border-[#2a2a2a] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span className="text-[#9ca3af]">Nome:</span>
                <span className="font-bold text-[#ffffff]">{currentUser.nome}</span>
              </div>
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span className="text-[#9ca3af]">Data de Nascimento / Idade:</span>
                <span className="text-[#ffffff]">{currentUser.nascimento} ({currentUser.idade} anos)</span>
              </div>
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span className="text-[#9ca3af]">Telefone / WhatsApp:</span>
                <span className="text-[#ffffff]">{currentUser.telefone}</span>
              </div>
              <div className="flex justify-between border-b border-[#262626] pb-2">
                <span className="text-[#9ca3af]">E-mail:</span>
                <span className="text-[#ffffff]">{currentUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9ca3af]">Endereço:</span>
                <span className="text-[#ffffff] text-right max-w-xs">{currentUser.endereco}</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer with Logout */}
        <div className="p-4 bg-[#1f1f1f] border-t border-[#2a2a2a] flex justify-between items-center text-xs">
          <span className="text-[#9ca3af]">
            Sessão ativa na Clínica Edilene Andrade
          </span>
          <button
            onClick={() => {
              db.setCurrentUser(null);
              onLogout();
              onClose();
            }}
            className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair da Conta</span>
          </button>
        </div>

      </div>
    </div>
  );
};
