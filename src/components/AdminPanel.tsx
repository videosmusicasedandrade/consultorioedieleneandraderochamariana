import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, MessageCircle, Calendar, Users, Gift, Share2, 
  HelpCircle, BookOpen, Database, Sparkles, Check, CheckCircle2, Clock, Send, Eye, FileText, PlusCircle, Mail
} from 'lucide-react';
import { db, SUPABASE_SQL_SCHEMA, getSupabaseConfig } from '../services/db';
import { ChatMessage, Appointment, User, Referral, PromoRedemption, QuizResponse, BlogPost, NewsletterSubscriber } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'agendamentos' | 'usuarios' | 'indicacoes' | 'aniversarios' | 'quiz' | 'blog' | 'newsletter' | 'por_que_funciona' | 'supabase'>('chat');
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [promotions, setPromotions] = useState<PromoRedemption[]>([]);
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [newsletterSubs, setNewsletterSubs] = useState<NewsletterSubscriber[]>([]);

  // Chat reply state
  const [selectedUserChat, setSelectedUserChat] = useState<string>('');
  const [adminReplyText, setAdminReplyText] = useState<string>('');

  // New Blog Article state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BlogPost['categoria']>('Cuidados Pós-Procedimento');
  const [newResumo, setNewResumo] = useState('');
  const [newContent, setNewContent] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  const loadData = () => {
    setMessages(db.getChatMessages());
    setAppointments(db.getAppointments());
    setUsers(db.getUsers());
    setReferrals(db.getReferrals());
    setPromotions(db.getPromotions());
    setQuizzes(db.getQuizResponses());
    setBlogPosts(db.getBlogPosts());
    setNewsletterSubs(db.getNewsletterSubscribers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('database-updated', loadData);
    return () => window.removeEventListener('database-updated', loadData);
  }, [isOpen]);

  if (!isOpen) return null;

  // Group chat messages by user
  const groupedChats: { [userId: string]: ChatMessage[] } = {};
  messages.forEach((m) => {
    if (!groupedChats[m.usuario_id]) groupedChats[m.usuario_id] = [];
    groupedChats[m.usuario_id].push(m);
  });

  const chatUserIds = Object.keys(groupedChats);
  const activeChatMessages = selectedUserChat ? groupedChats[selectedUserChat] || [] : [];
  const activeChatUser = users.find((u) => u.id === selectedUserChat);

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserChat || !adminReplyText.trim()) return;

    db.sendMessage({
      usuario_id: selectedUserChat,
      nome_usuario: 'Dra. Edilene Rocha de Andrade',
      mensagem: adminReplyText.trim(),
      remetente: 'clinica',
    });

    setAdminReplyText('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    db.addBlogPost({
      titulo: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      categoria: newCategory,
      resumo: newResumo.trim() || newTitle,
      conteudo: newContent.split('\n\n').filter(Boolean),
      tempoLeitura: '4 min',
      dataPublicacao: new Date().toISOString().split('T')[0],
      imagemSlot: '[COLOQUE AQUI: imagem ilustrativa do artigo odontológico]',
      autor: 'Dra. Edilene Rocha de Andrade (CRO-MG 19135)',
    });

    setNewTitle('');
    setNewResumo('');
    setNewContent('');
    alert('Artigo publicado com sucesso no blog da clínica!');
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#171717] border border-[#d4b874]/60 rounded-2xl shadow-2xl overflow-hidden h-[94vh] flex flex-col">
        
        {/* Admin Bar */}
        <div className="p-4 sm:p-5 bg-[#1f1f1f] border-b border-[#2a2a2a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4b874] text-[#121212] flex items-center justify-center font-display font-extrabold text-sm shadow">
              EA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-[#ffffff]">
                  Painel Administrativo • Dra. Edilene Andrade
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#d4b874]/20 text-[#d4b874] text-[10px] font-bold">
                  CRO-MG 19135
                </span>
              </div>
              <p className="text-xs text-[#9ca3af]">
                Gestão da Clínica de Mariana - MG | edilenerocha@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                db.setCurrentUser(null);
                onLogout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#282828] text-xs text-red-400 hover:bg-red-950/40 cursor-pointer transition-colors"
            >
              Sair
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#262626] text-[#9ca3af] hover:text-[#ffffff] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-[#121212] border-b border-[#282828] overflow-x-auto text-xs shrink-0">
          {[
            { id: 'chat', label: 'Conversas do Chat', icon: MessageCircle, count: messages.filter(m => !m.lido).length },
            { id: 'agendamentos', label: 'Agendamentos', icon: Calendar, count: appointments.length },
            { id: 'usuarios', label: 'Usuários Cadastrados', icon: Users, count: users.length },
            { id: 'indicacoes', label: 'Programa de Indicações', icon: Share2, count: referrals.length },
            { id: 'aniversarios', label: 'Aniversariantes Resgatados', icon: Gift, count: promotions.length },
            { id: 'quiz', label: 'Respostas do Simulador', icon: HelpCircle, count: quizzes.length },
            { id: 'blog', label: 'Gerenciar Blog', icon: BookOpen, count: blogPosts.length },
            { id: 'newsletter', label: 'Newsletter', icon: Mail, count: newsletterSubs.length },
            { id: 'por_que_funciona', label: '💡 Por Que Funciona (Guia Dra. Edilene)', icon: Sparkles },
            { id: 'supabase', label: '🗄️ Supabase & Vercel', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#d4b874] text-[#121212] font-bold shadow'
                    : 'text-[#9ca3af] hover:text-[#ffffff] hover:bg-[#1e1e1e]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#121212] text-[#d4b874]' : 'bg-[#64b5a6] text-[#121212]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Views */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-[#141414]">
          
          {/* TAB: CHAT MANAGER */}
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full">
              {/* User list */}
              <div className="md:col-span-4 bg-[#1a1a1a] border border-[#282828] rounded-xl p-3 flex flex-col space-y-2 overflow-y-auto max-h-[65vh]">
                <span className="text-xs font-semibold text-[#d4b874] uppercase tracking-wider px-2 py-1">
                  Pacientes em Atendimento
                </span>
                {chatUserIds.map((uid) => {
                  const userMsgs = groupedChats[uid];
                  const lastMsg = userMsgs[userMsgs.length - 1];
                  const unread = userMsgs.some((m) => !m.lido && m.remetente === 'usuario');
                  const u = users.find((usr) => usr.id === uid);

                  return (
                    <button
                      key={uid}
                      onClick={() => {
                        setSelectedUserChat(uid);
                        // Mark as read
                        userMsgs.forEach((m) => db.updateMessageStatus(m.id, 'lida'));
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                        selectedUserChat === uid
                          ? 'bg-[#d4b874]/15 border-[#d4b874]'
                          : 'bg-[#141414] border-[#262626] hover:border-[#3a3a3a]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-[#ffffff]">
                          {u?.nome || lastMsg?.nome_usuario || 'Visitante'}
                        </span>
                        {unread && (
                          <span className="w-2 h-2 rounded-full bg-[#64b5a6] animate-pulse" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#9ca3af] truncate">
                        {lastMsg?.mensagem}
                      </p>
                      <div className="text-[10px] text-[#64b5a6] mt-1 flex justify-between">
                        <span>{u?.telefone || 'Site'}</span>
                        <span>{new Date(lastMsg?.data_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chat View */}
              <div className="md:col-span-8 bg-[#181818] border border-[#282828] rounded-xl flex flex-col overflow-hidden max-h-[65vh]">
                {selectedUserChat ? (
                  <>
                    <div className="p-3.5 bg-[#202020] border-b border-[#2d2d2d] flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-[#ffffff]">
                          {activeChatUser?.nome || 'Paciente'}
                        </h4>
                        <span className="text-[10px] text-[#9ca3af]">
                          {activeChatUser?.telefone} • {activeChatUser?.endereco || 'Mariana - MG'}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            activeChatMessages.forEach(m => db.updateMessageStatus(m.id, 'atendida'));
                            alert('Conversa marcada como Atendida!');
                          }}
                          className="px-2.5 py-1 rounded bg-[#64b5a6]/20 text-[#64b5a6] text-[10px] font-bold hover:bg-[#64b5a6]/30 cursor-pointer"
                        >
                          Marcar Atendida
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#131313]">
                      {activeChatMessages.map((m) => {
                        const isClinic = m.remetente === 'clinica';
                        return (
                          <div
                            key={m.id}
                            className={`flex flex-col ${isClinic ? 'items-end' : 'items-start'}`}
                          >
                            <span className="text-[9px] text-[#888] mb-0.5">
                              {isClinic ? 'Dra. Edilene (Clínica)' : m.nome_usuario}
                            </span>
                            <div
                              className={`p-3 rounded-xl max-w-[85%] text-xs ${
                                isClinic
                                  ? 'bg-[#64b5a6] text-[#121212] font-semibold'
                                  : 'bg-[#d4b874] text-[#121212] font-medium'
                              }`}
                            >
                              {m.mensagem}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <form onSubmit={handleSendAdminReply} className="p-3 bg-[#1e1e1e] border-t border-[#2d2d2d] flex gap-2">
                      <input
                        type="text"
                        placeholder="Responder como Dra. Edilene Rocha..."
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        className="flex-1 bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none focus:border-[#d4b874]"
                      />
                      <button
                        type="submit"
                        className="btn-gold py-2 px-4 text-xs cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#9ca3af] text-xs">
                    <MessageCircle className="w-8 h-8 text-[#d4b874] mb-2" />
                    Selecione uma conversa ao lado para responder.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: AGENDAMENTOS */}
          {activeTab === 'agendamentos' && (
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#ffffff]">
                Solicitações e Consultas Agendadas na Clínica
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-[#d1d5db]">
                  <thead className="bg-[#1e1e1e] text-[#d4b874] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Paciente</th>
                      <th className="p-3">Procedimento</th>
                      <th className="p-3">Data / Hora</th>
                      <th className="p-3">Lembretes</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    {appointments.map((a) => (
                      <tr key={a.id} className="hover:bg-[#1a1a1a]">
                        <td className="p-3">
                          <div className="font-bold text-[#ffffff]">{a.nome_paciente}</div>
                          <div className="text-[10px] text-[#9ca3af]">{a.telefone_paciente}</div>
                        </td>
                        <td className="p-3 font-medium text-[#d4b874]">{a.procedimento}</td>
                        <td className="p-3">
                          {a.data.split('-').reverse().join('/')} às {a.horario}
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] text-[#64b5a6]">
                            {a.lembreteWhatsApp ? '✓ WhatsApp ' : ''}
                            {a.lembreteEmail ? '✓ E-mail' : ''}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            a.status === 'confirmado' ? 'bg-[#64b5a6]/20 text-[#64b5a6]' : 'bg-[#d4b874]/20 text-[#d4b874]'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => db.updateAppointmentStatus(a.id, 'confirmado')}
                              className="px-2 py-1 rounded bg-[#64b5a6]/20 text-[#64b5a6] text-[10px] hover:bg-[#64b5a6]/30 cursor-pointer"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => db.updateAppointmentStatus(a.id, 'concluido')}
                              className="px-2 py-1 rounded bg-[#282828] text-[#ffffff] text-[10px] hover:bg-[#333] cursor-pointer"
                            >
                              Concluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: USUARIOS CADASTRADOS */}
          {activeTab === 'usuarios' && (
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#ffffff]">
                Base de Usuários & Pacientes Cadastrados em Mariana
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((u) => (
                  <div key={u.id} className="p-4 rounded-xl bg-[#181818] border border-[#262626] text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-[#ffffff] text-sm">{u.nome}</div>
                      <span className="px-2 py-0.5 rounded bg-[#d4b874]/20 text-[#d4b874] text-[10px] uppercase font-bold">
                        {u.tipo}
                      </span>
                    </div>
                    <div className="text-[#9ca3af]">Nascimento: {u.nascimento} ({u.idade} anos)</div>
                    <div className="text-[#64b5a6]">WhatsApp: {u.telefone}</div>
                    <div className="text-[#9ca3af]">E-mail: {u.email}</div>
                    <div className="text-[#e5e5e5] text-[11px] pt-1 border-t border-[#262626]">
                      {u.endereco}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INDICACOES */}
          {activeTab === 'indicacoes' && (
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#ffffff]">
                Programa Sorriso Compartilhado (Indicações Recebidas)
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-[#d1d5db]">
                  <thead className="bg-[#1e1e1e] text-[#d4b874] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Quem Indicou</th>
                      <th className="p-3">Pessoa Indicada</th>
                      <th className="p-3">Telefone</th>
                      <th className="p-3">Relação</th>
                      <th className="p-3">Data</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    {referrals.map((r) => (
                      <tr key={r.id} className="hover:bg-[#1a1a1a]">
                        <td className="p-3 font-semibold text-[#ffffff]">{r.nome_indicante}</td>
                        <td className="p-3 text-[#d4b874]">{r.nome_indicado}</td>
                        <td className="p-3">{r.telefone}</td>
                        <td className="p-3 text-[#9ca3af]">{r.relacao}</td>
                        <td className="p-3">{r.data}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            r.status === 'atendido' ? 'bg-[#64b5a6]/20 text-[#64b5a6]' : 'bg-[#d4b874]/20 text-[#d4b874]'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => db.updateReferralStatus(r.id, 'atendido')}
                            className="px-2 py-1 rounded bg-[#64b5a6]/20 text-[#64b5a6] text-[10px] hover:bg-[#64b5a6]/30 cursor-pointer"
                          >
                            Marcar Atendido
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ANIVERSARIOS */}
          {activeTab === 'aniversarios' && (
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#ffffff]">
                Vouchers de Aniversariantes Resgatados
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promotions.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-[#181818] border border-[#2a2a2a] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#ffffff] text-sm">{p.nome_paciente}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.utilizada ? 'bg-[#2a2a2a] text-[#888]' : 'bg-[#64b5a6]/20 text-[#64b5a6]'
                      }`}>
                        {p.utilizada ? 'Utilizado' : 'Ativo / Não Utilizado'}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-[#d4b874]">
                      {p.codigo_voucher}
                    </div>
                    <div className="text-[11px] text-[#9ca3af]">
                      Benefício: {p.tipo === 'aniversario_clareamento' ? 'Clareamento Dental' : 'Limpeza / Profilaxia'}
                    </div>
                    {!p.utilizada && (
                      <button
                        onClick={() => db.markPromotionUsed(p.id)}
                        className="btn-outline-gold py-1 px-3 text-[11px] cursor-pointer mt-2"
                      >
                        Validar e Marcar como Utilizado
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: QUIZ / AUTOAVALIAÇÃO */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-[#ffffff]">
                Respostas do Simulador de Autoavaliação
              </h4>

              <div className="space-y-3">
                {quizzes.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-[#181818] border border-[#2a2a2a] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#ffffff]">{q.nome || 'Visitante Anônimo'}</span>
                      <span className="px-2 py-0.5 rounded bg-[#d4b874]/20 text-[#d4b874] font-bold">
                        Sugerido: {q.procedimento_sugerido}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#9ca3af] bg-[#141414] p-3 rounded-lg">
                      <div>
                        <strong className="text-[#e5e5e5] block">1. Esconde Sorriso:</strong>
                        {q.respostas.escondeSorriso}
                      </div>
                      <div>
                        <strong className="text-[#e5e5e5] block">2. Incômodo Principal:</strong>
                        {q.respostas.incomodoPrincipal}
                      </div>
                      <div>
                        <strong className="text-[#e5e5e5] block">3. Sonho:</strong>
                        {q.respostas.sonhoSorriso}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GERENCIAR BLOG */}
          {activeTab === 'blog' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form to create article */}
              <div className="lg:col-span-5 bg-[#181818] border border-[#282828] rounded-xl p-5 space-y-4 text-xs">
                <h4 className="font-display text-sm font-bold text-[#ffffff] flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4 text-[#d4b874]" />
                  Publicar Novo Artigo no Blog
                </h4>

                <form onSubmit={handleCreatePost} className="space-y-3">
                  <div>
                    <label className="block text-[#9ca3af] mb-1">Título do Artigo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Como evitar sensibilidade pós-clareamento..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#131313] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none focus:border-[#d4b874]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9ca3af] mb-1">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#131313] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none"
                    >
                      <option value="Cuidados Pós-Procedimento">Cuidados Pós-Procedimento</option>
                      <option value="Inovações Odontológicas">Inovações Odontológicas</option>
                      <option value="Estética & Autoestima">Estética & Autoestima</option>
                      <option value="Saúde Bucal em Família">Saúde Bucal em Família</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#9ca3af] mb-1">Resumo (SEO)</label>
                    <input
                      type="text"
                      placeholder="Breve resumo para os resultados de busca..."
                      value={newResumo}
                      onChange={(e) => setNewResumo(e.target.value)}
                      className="w-full bg-[#131313] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9ca3af] mb-1">Conteúdo (parágrafos separados por linha dupla)</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Escreva os parágrafos do artigo..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-[#131313] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-2.5 text-xs font-bold cursor-pointer"
                  >
                    Publicar Artigo
                  </button>
                </form>
              </div>

              {/* List of existing posts */}
              <div className="lg:col-span-7 space-y-3">
                <h4 className="font-display text-sm font-bold text-[#ffffff]">
                  Artigos Ativos no Site ({blogPosts.length})
                </h4>

                {blogPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-xl bg-[#181818] border border-[#2a2a2a] text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-[#ffffff] text-sm">{post.titulo}</h5>
                      <span className="px-2 py-0.5 rounded bg-[#64b5a6]/20 text-[#64b5a6] text-[10px]">
                        {post.categoria}
                      </span>
                    </div>
                    <p className="text-[#9ca3af] line-clamp-2">{post.resumo}</p>
                    <div className="flex justify-between items-center text-[10px] text-[#888] pt-2 border-t border-[#242424]">
                      <span>{post.tempoLeitura} • {post.dataPublicacao}</span>
                      <span className="text-[#d4b874]">{post.comentarios?.length || 0} comentários</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NEWSLETTER / ASSINANTES */}
          {activeTab === 'newsletter' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262626]">
                <div>
                  <h4 className="font-display text-base font-bold text-[#ffffff] flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#d4b874]" />
                    Assinantes da Newsletter ({newsletterSubs.length})
                  </h4>
                  <p className="text-xs text-[#9ca3af]">
                    Contatos capturados no rodapé do site interessados em dicas de saúde bucal e novidades da clínica.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const emailList = newsletterSubs.map((s) => s.email).join(', ');
                    navigator.clipboard.writeText(emailList);
                    alert('Lista de e-mails copiada com sucesso para a área de transferência!');
                  }}
                  className="btn-gold py-1.5 px-3 text-xs font-semibold cursor-pointer shrink-0"
                >
                  Copiar Lista de E-mails
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-[#d1d5db]">
                  <thead className="bg-[#1e1e1e] text-[#d4b874] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">E-mail Cadastrado</th>
                      <th className="p-3">Nome do Paciente</th>
                      <th className="p-3">Data de Inscrição</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    {newsletterSubs.map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#1a1a1a]">
                        <td className="p-3 font-semibold text-[#ffffff]">{sub.email}</td>
                        <td className="p-3 text-[#d1d5db]">{sub.nome || 'Não informado'}</td>
                        <td className="p-3 text-[#9ca3af]">
                          {sub.data_inscricao.split('-').reverse().join('/')}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-[#64b5a6]/20 text-[#64b5a6] text-[10px] font-bold uppercase">
                            Ativo
                          </span>
                        </td>
                        <td className="p-3">
                          <a
                            href={`mailto:${sub.email}?subject=Novidades%20da%20Cl%C3%ADnica%20Edilene%20Andrade&body=Ol%C3%A1${sub.nome ? `%20${encodeURIComponent(sub.nome)}` : ''}%2C%0A%0ASegue%20nossa%20dica%20especial%20de%20sa%C3%BAde%20bucal...`}
                            className="text-[#d4b874] hover:underline text-[11px] font-medium"
                          >
                            Enviar E-mail
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: POR QUE FUNCIONA (ITEM 17 COMPLETO) */}
          {activeTab === 'por_que_funciona' && (
            <div className="max-w-4xl space-y-6 text-xs text-[#e5e5e5] leading-relaxed">
              
              <div className="p-5 rounded-2xl bg-[#181818] border border-[#d4b874]/60 space-y-3">
                <div className="flex items-center gap-2 text-[#d4b874] text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Guia Estratégico Explicativo da Tia Edilene</span>
                </div>
                <p className="text-sm font-serif italic text-[#ffffff]">
                  "A mente do paciente de odontologia não decide por especificações de titânio ou resina fotopolimerizável. Ela decide por dignidade, alívio do medo e a certeza de que é merecedora de um sorriso belo."
                </p>
              </div>

              {/* Topic 1: Por que cada frase foi escolhida */}
              <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                <h4 className="text-sm font-bold text-[#d4b874] font-display">
                  1. Por que cada frase foi escolhida (Emoção antes de Técnica)
                </h4>
                <p>
                  A frase principal <em>"Você não merece apenas um dentista. Você merece sorrir sem medo, sem esconder..."</em> toca diretamente na dor silenciosa do paciente que coloca a mão na boca ao rir. Ao focar no <strong>merecimento</strong> e na <strong>liberdade</strong>, removemos a culpa do adiamento e transformamos a busca em um ato de amor-próprio.
                </p>
                <p className="text-[#9ca3af]">
                  Nunca usamos "preço", e sim <strong>"Investimento"</strong>, porque preço remete a gasto perdido, enquanto investimento comunica valor permanente para a saúde e autoestima.
                </p>
              </div>

              {/* Topic 2: Por que as cores */}
              <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                <h4 className="text-sm font-bold text-[#d4b874] font-display">
                  2. Por que as cores (Preto, Ouro e Verde-Água)
                </h4>
                <p>
                  • <strong>Preto fosco (#121212) e Cinza profundo (#1A1A1A):</strong> Criam um ambiente de alta exclusividade, sobriedade e luxo silencioso. Diferencia imediatamente das clínicas populares com fundos azuis e brancos frios.<br />
                  • <strong>Dourado champagne (#D4B874):</strong> Desperta a percepção de preciosidade, conquista e brilho do sorriso renovado.<br />
                  • <strong>Verde-água suave (#64B5A6):</strong> Acalma a amígdala cerebral, reduz a ansiedade de dor e traz a sensação de cuidado clínico, higiene e serenidade.
                </p>
              </div>

              {/* Topic 3: Fotos Antes/Depois */}
              <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                <h4 className="text-sm font-bold text-[#d4b874] font-display">
                  3. Por que fotos de Antes/Depois convencem mais
                </h4>
                <p>
                  O cérebro humano processa contraste visual em milissegundos. Ao ver o estado inicial e o resultado transformado com o controle do slider, o visitante não precisa "imaginar": ele testemunha a prova palpável de que o mesmo pode acontecer com ele. Isso elimina o ceticismo e desperta o desejo imediato de agendamento.
                </p>
              </div>

              {/* Topic 4: Atendimento no Chat */}
              <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                <h4 className="text-sm font-bold text-[#d4b874] font-display">
                  4. Como atender pelo Chat: Chamar pelo Nome, Ouvir e Acolher
                </h4>
                <p>
                  Quando o paciente entrar no chat:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#9ca3af] pl-2">
                  <li>Sempre chame o paciente pelo primeiro nome logo no primeiro cumprimento.</li>
                  <li>Nunca responda com valores secos; pergunte primeiro: <em>"O que motivou sua procura hoje? Queremos entender seu objetivo para te cuidar da melhor forma."</em></li>
                  <li>Reconheça qualquer medo com ternura: <em>"Fique tranquilo(a), aqui em Mariana cuidamos com anestesia sem picada e você estará em ambiente acolhedor."</em></li>
                </ul>
              </div>

              {/* Topic 5: Promoção Aniversariante */}
              <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                <h4 className="text-sm font-bold text-[#d4b874] font-display">
                  5. Como fidelizar pela Promoção de Aniversário
                </h4>
                <p>
                  No mês de aniversário, a pessoa está naturalmente mais sensível a cuidar de si e comemorar com novas fotos. Ao presentear com desconto em clareamento ou profilaxia e uma lembrancinha da clínica, a Clínica Edilene Andrade entra na memória afetiva da família de Mariana como uma parceira de vida, gerando indicações espontâneas.
                </p>
              </div>

            </div>
          )}

          {/* TAB: SUPABASE & VERCEL */}
          {activeTab === 'supabase' && (() => {
            const config = getSupabaseConfig();
            return (
              <div className="max-w-4xl space-y-6 text-xs text-[#e5e5e5]">
                {/* Status Card */}
                <div className="p-4 rounded-xl bg-[#181818] border border-[#2d2d2d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${config.isConfigured ? 'bg-[#64b5a6] animate-pulse' : 'bg-[#d4b874]'}`} />
                    <div>
                      <span className="font-bold text-sm text-[#ffffff] block">
                        Status da Conexão Supabase
                      </span>
                      <span className="text-xs text-[#9ca3af]">
                        {config.isConfigured
                          ? `Conectado ao Supabase: ${config.url}`
                          : 'Operando em Modo de Persistência Local (LocalStorage). Pronto para plugar as chaves da Vercel.'}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 ${
                    config.isConfigured ? 'bg-[#64b5a6]/20 text-[#64b5a6]' : 'bg-[#d4b874]/20 text-[#d4b874]'
                  }`}>
                    {config.isConfigured ? 'Nuvem Ativa' : 'Pronto p/ Deploy'}
                  </span>
                </div>

                {/* Vercel Environment Variables Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#181818] via-[#1b1914] to-[#141414] border border-[#d4b874]/50 space-y-3">
                  <div className="flex items-center gap-2 text-[#d4b874] font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Variáveis de Ambiente Necessárias na Vercel</span>
                  </div>

                  <p className="text-[#9ca3af] leading-relaxed">
                    No painel do seu projeto na Vercel (<strong>Settings &gt; Environment Variables</strong>), adicione as seguintes variáveis obtidas no seu painel do Supabase (<strong>Project Settings &gt; API</strong>):
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#101010] border border-[#2a2a2a] space-y-1">
                      <span className="text-[10px] text-[#9ca3af] uppercase tracking-wider block font-semibold">
                        Variável 1 (URL do Banco)
                      </span>
                      <div className="font-mono text-xs text-[#d4b874] font-bold">
                        VITE_SUPABASE_URL
                      </div>
                      <span className="text-[10px] text-[#737373] block">
                        (ou SUPABASE_URL) • Ex: https://xyz.supabase.co
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#101010] border border-[#2a2a2a] space-y-1">
                      <span className="text-[10px] text-[#9ca3af] uppercase tracking-wider block font-semibold">
                        Variável 2 (Chave Pública Anon)
                      </span>
                      <div className="font-mono text-xs text-[#d4b874] font-bold">
                        VITE_SUPABASE_ANON_KEY
                      </div>
                      <span className="text-[10px] text-[#737373] block">
                        (ou SUPABASE_ANON_KEY) • Ex: eyJhbGciOi...
                      </span>
                    </div>
                  </div>
                </div>

                {/* SQL Script Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-mono text-xs text-[#d4b874] font-bold block">
                        supabase_schema.sql (9 Tabelas com Índices)
                      </span>
                      <span className="text-[11px] text-[#9ca3af]">
                        Cole este script no <strong>SQL Editor</strong> do Supabase e clique em <strong>Run</strong>:
                      </span>
                    </div>

                    <button
                      onClick={handleCopySql}
                      className="btn-gold py-1.5 px-3 text-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? 'Copiado!' : 'Copiar Script SQL'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#101010] border border-[#282828] font-mono text-[11px] text-[#8ed0c4] overflow-x-auto max-h-96">
                    {SUPABASE_SQL_SCHEMA}
                  </pre>
                </div>
              </div>
            );
          })()}

        </div>

      </div>
    </div>
  );
};
