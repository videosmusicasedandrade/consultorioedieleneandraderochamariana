import { User, ChatMessage, Appointment, Referral, PromoRedemption, QuizResponse, BlogPost, BlogComment, NewsletterSubscriber } from '../types';

const STORAGE_KEYS = {
  USERS: 'edilene_users_v1',
  CHAT: 'edilene_chat_v1',
  APPOINTMENTS: 'edilene_appointments_v1',
  REFERRALS: 'edilene_referrals_v1',
  PROMOTIONS: 'edilene_promotions_v1',
  QUIZ: 'edilene_quiz_v1',
  BLOG: 'edilene_blog_v1',
  NEWSLETTER: 'edilene_newsletter_v1',
  CURRENT_USER: 'edilene_session_user_v1',
};

// Default Admin Credentials
export const ADMIN_CREDENTIALS = {
  email: 'edilenerocha@gmail.com',
  senha: 'edilene55@',
  nome: 'Dra. Edilene Rocha de Andrade',
  cro: 'CRO-MG 19135',
};

const initialUsers: User[] = [
  {
    id: 'admin-edilene',
    nome: 'Dra. Edilene Rocha de Andrade',
    nascimento: '1970-05-14',
    idade: 56,
    telefone: '(31) 98845-2121',
    email: 'edilenerocha@gmail.com',
    endereco: 'Rua Frei Durão, 45 - Centro Histórico, Mariana - MG',
    senha: 'edilene55@',
    tipo: 'admin',
    criadoEm: '1994-03-01T08:00:00.000Z',
  },
  {
    id: 'user-juliana',
    nome: 'Juliana Mendes de Castro',
    nascimento: '1988-10-18', // Current month birthday for demonstration
    idade: 38,
    telefone: '(31) 99123-4567',
    email: 'juliana.castro@gmail.com',
    endereco: 'Rua das Rosas, 120 - Bairro Bauxita, Mariana - MG',
    senha: 'senha123',
    tipo: 'paciente',
    criadoEm: '2026-09-10T14:30:00.000Z',
  },
  {
    id: 'user-carlos',
    nome: 'Carlos Eduardo Nogueira',
    nascimento: '1975-04-22',
    idade: 51,
    telefone: '(31) 98765-4321',
    email: 'carlos.edu@gmail.com',
    endereco: 'Praça Minas Gerais, 84 - Centro Histórico, Mariana - MG',
    senha: 'senha123',
    tipo: 'paciente',
    criadoEm: '2026-10-01T10:15:00.000Z',
  },
];

const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    usuario_id: 'user-juliana',
    nome_usuario: 'Juliana Mendes de Castro',
    telefone_usuario: '(31) 99123-4567',
    mensagem: 'Olá, Dra. Edilene! Vi os resultados das facetas e estou muito encantada. Gostaria de saber como funciona a avaliação.',
    remetente: 'usuario',
    data_hora: new Date(Date.now() - 3600000 * 5).toISOString(),
    lido: true,
    status: 'atendida',
  },
  {
    id: 'msg-2',
    usuario_id: 'user-juliana',
    nome_usuario: 'Juliana Mendes de Castro',
    telefone_usuario: '(31) 99123-4567',
    mensagem: 'Olá, Juliana! Que alegria receber você. O primeiro passo é uma conversa acolhedora com escaneamento digital do seu sorriso para você ver antes mesmo de começar. Venha tomar um café conosco!',
    remetente: 'clinica',
    data_hora: new Date(Date.now() - 3600000 * 4.5).toISOString(),
    lido: true,
    status: 'atendida',
  },
  {
    id: 'msg-3',
    usuario_id: 'user-carlos',
    nome_usuario: 'Carlos Eduardo Nogueira',
    telefone_usuario: '(31) 98765-4321',
    mensagem: 'Boa tarde! Tenho muito receio de dor em implante. Sempre adiei por isso...',
    remetente: 'usuario',
    data_hora: new Date(Date.now() - 3600000 * 2).toISOString(),
    lido: false,
    status: 'pendente',
  },
  {
    id: 'msg-4',
    usuario_id: 'user-carlos',
    nome_usuario: 'Carlos Eduardo Nogueira',
    telefone_usuario: '(31) 98765-4321',
    mensagem: 'Carlos, seu sentimento é muito compreensível e comum. Aqui em Mariana utilizamos tecnologia com anestesia computadorizada sem picada e sedação consciente. Nossos pacientes costumam dizer que nem sentiram passar!',
    remetente: 'clinica',
    data_hora: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    lido: true,
    status: 'pendente',
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    usuario_id: 'user-juliana',
    nome_paciente: 'Juliana Mendes de Castro',
    telefone_paciente: '(31) 99123-4567',
    email_paciente: 'juliana.castro@gmail.com',
    procedimento: 'Facetas & Lentes de Contato',
    data: '2026-10-28',
    horario: '14:30',
    status: 'confirmado',
    observacoes: 'Deseja melhorar harmonia e brilho dos incisivos para fotos de formatura.',
    lembreteWhatsApp: true,
    lembreteEmail: true,
    criadoEm: '2026-10-20T11:00:00.000Z',
  },
  {
    id: 'apt-2',
    usuario_id: 'user-carlos',
    nome_paciente: 'Carlos Eduardo Nogueira',
    telefone_paciente: '(31) 98765-4321',
    email_paciente: 'carlos.edu@gmail.com',
    procedimento: 'Implantes Dentários sem Dor',
    data: '2026-10-30',
    horario: '10:00',
    status: 'solicitado',
    observacoes: 'Avaliação para reposição de 2 dentes posteriores com técnica guiada.',
    lembreteWhatsApp: true,
    lembreteEmail: false,
    criadoEm: '2026-10-25T09:15:00.000Z',
  },
];

const initialReferrals: Referral[] = [
  {
    id: 'ref-1',
    indicante_id: 'user-juliana',
    nome_indicante: 'Juliana Mendes de Castro',
    nome_indicado: 'Roberta Guimarães',
    telefone: '(31) 99344-8899',
    relacao: 'Irmã',
    data: '2026-10-15',
    status: 'atendido',
  },
  {
    id: 'ref-2',
    indicante_id: 'user-juliana',
    nome_indicante: 'Juliana Mendes de Castro',
    nome_indicado: 'Marcos Vinicius',
    telefone: '(31) 99811-2233',
    relacao: 'Colega de Trabalho',
    data: '2026-10-22',
    status: 'atendido',
  },
];

const initialPromotions: PromoRedemption[] = [
  {
    id: 'promo-1',
    usuario_id: 'user-juliana',
    nome_paciente: 'Juliana Mendes de Castro',
    tipo: 'aniversario_clareamento',
    data: '2026-10-18',
    utilizada: false,
    codigo_voucher: 'ANIV-MARIANA-2026-JULI',
  },
];

const initialQuizResponses: QuizResponse[] = [
  {
    id: 'quiz-1',
    usuario_id: 'user-juliana',
    nome: 'Juliana Mendes de Castro',
    telefone: '(31) 99123-4567',
    respostas: {
      escondeSorriso: 'Sempre que tiro fotos em família',
      incomodoPrincipal: 'Cor e formato desalinhado',
      sonhoSorriso: 'Brilhar com naturalidade e confiança',
    },
    procedimento_sugerido: 'Facetas & Lentes de Contato',
    data: '2026-09-10T14:00:00.000Z',
  },
];

const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    titulo: 'Cuidados Essenciais Pós-Implante: Como Garantir uma Recuperação Rápida e sem Desconforto',
    slug: 'cuidados-pos-implante-dentario',
    categoria: 'Cuidados Pós-Procedimento',
    resumo: 'Passou pelo procedimento de implante dentário em nossa clínica em Mariana? Descubra orientações práticas para mastigação, higienização e repouso.',
    conteudo: [
      'A cirurgia de implante dentário guiada hoje é incomparavelmente mais suave do que há alguns anos. Em nossa clínica em Mariana, a precisão milimétrica reduz quase a zero o inchaço cirúrgico.',
      'Nas primeiras 48 horas, o repouso relativo é o seu maior aliado. Prefira alimentos frios ou mornos, pastosos e ricos em nutrientes, como caldos leves, iogurtes e purês.',
      'Aplicação de compressa fria externa por 15 minutos intervalados auxilia na prevenção de qualquer sensibilidade vascular.',
      'A higienização deve ser mantida com delicadeza: escove os dentes vizinhos normalmente e utilize a solução antisséptica prescrita pela Dra. Edilene sem bochechos vigorosos.',
      'Lembre-se: qualquer dúvida, nossa equipe está a uma mensagem de distância pelo WhatsApp de plantão.'
    ],
    tempoLeitura: '4 min',
    dataPublicacao: '2026-10-15',
    imagemSlot: '[COLOQUE AQUI: pessoa recuperando o sorriso com saúde e tranquilidade]',
    imagemUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    autor: 'Dra. Edilene Rocha de Andrade (CRO-MG 19135)',
    comentarios: [
      {
        id: 'c-1',
        artigo_id: 'post-1',
        nome_autor: 'Rogério Batista',
        cidade: 'Mariana - MG',
        comentario: 'Segui exatamente essas dicas após meu implante mês passado com a Dra. Edilene e nem precisei de analgésico no segundo dia!',
        data: '2026-10-18',
      }
    ]
  },
  {
    id: 'post-2',
    titulo: 'Anestesia Computadorizada: O Fim do Medo de Dentista em Mariana',
    slug: 'anestesia-computadorizada-sem-dor',
    categoria: 'Inovações Odontológicas',
    resumo: 'Entenda como o controle eletrônico de fluxo de anestésico elimina a pressão que causava a clássica dor da picada.',
    conteudo: [
      'O maior motivo pelo qual homens e mulheres adiam consultas odontológicas não é o procedimento em si, mas a memória de dor da agulha tradicional.',
      'A anestesia computadorizada monitora digitalmente a resistência do tecido antes de depositar cada gota infinitesimal de anestésico.',
      'O resultado prático? Você não sente a introdução e nem a queimação da expansão tecidual. Além disso, a anestesia é localizada: seus lábios não ficam adormecidos por horas após o término da consulta.',
      'Na Clínica Edilene Andrade, a tecnologia sempre serve ao conforto do ser humano.'
    ],
    tempoLeitura: '5 min',
    dataPublicacao: '2026-10-08',
    imagemSlot: '[COLOQUE AQUI: sala de atendimento moderna e estéril em Mariana]',
    imagemUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    autor: 'Equipe Clínica Edilene Andrade',
    comentarios: [
      {
        id: 'c-2',
        artigo_id: 'post-2',
        nome_autor: 'Carla Silveira',
        cidade: 'Mariana - MG',
        comentario: 'Eu tinha pânico desde a infância. Foi a primeira vez na vida que fiz um procedimento sem suar frio.',
        data: '2026-10-10',
      }
    ]
  },
  {
    id: 'post-3',
    titulo: 'Alinhadores Invisíveis vs Aparelho Fixo: Qual Vale Mais a Pena?',
    slug: 'alinhadores-invisiveis-vs-aparelho-fixo',
    categoria: 'Estética & Autoestima',
    resumo: 'Comparativo detalhado sobre tempo de tratamento, estética no dia a dia profissional e conforto mastigatório.',
    conteudo: [
      'Adultos ativos no mercado de trabalho e vida social costumam evitar o aparelho com braquetes metálicos pelo impacto visual.',
      'Os alinhadores transparentes são praticamente imperceptíveis a mais de 30 centímetros de distância. Você pode retirá-los para almoçar e escovar os dentes com total liberdade.',
      'O planejamento em nosso software 3D projeta cada micromovimento antes de fabricar as placas, proporcionando previsibilidade milimétrica.',
      'Em nossa clínica, avaliamos seu perfil esquelético e rotina para indicar exatamente a alternativa mais eficiente.'
    ],
    tempoLeitura: '6 min',
    dataPublicacao: '2026-09-28',
    imagemSlot: '[COLOQUE AQUI: close-up de sorriso brilhante e alinhado]',
    imagemUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    autor: 'Dra. Edilene Rocha de Andrade (CRO-MG 19135)',
    comentarios: []
  },
  {
    id: 'post-4',
    titulo: 'Como Manter o Clareamento Dental Branco e Radiante por Anos',
    slug: 'como-manter-clareamento-dental-radiante',
    categoria: 'Cuidados Pós-Procedimento',
    resumo: 'Dicas práticas de alimentação, café, vinho e higiene para prolongar a luminosidade conquistada em consultório.',
    conteudo: [
      'Após o clareamento a laser em consultório, os canalículos dentinários permanecem temporariamente permeáveis nas primeiras 72 horas.',
      'Evite corantes escuros intensos (café expresso, açaí, vinho tinto e molho shoyu) nos primeiros 3 a 5 dias.',
      'Utilize escova de cerdas ultra macias e cremes dentais de baixa abrasividade para não desgastar o polimento dental.',
      'A manutenção periódica a cada 12 a 18 meses com a profilaxia profissional na Clínica Edilene Andrade garante que seu sorriso continue refletindo luz com intensidade.'
    ],
    tempoLeitura: '4 min',
    dataPublicacao: '2026-09-14',
    imagemSlot: '[COLOQUE AQUI: ANTES amarelados + DEPOIS brancos]',
    imagemUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    autor: 'Equipe Clínica Edilene Andrade',
    comentarios: []
  }
];

// Helper to initialize and retrieve from localStorage
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('database-updated', { detail: { key } }));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

const initialNewsletterSubscribers: NewsletterSubscriber[] = [
  {
    id: 'news-1',
    email: 'juliana.castro@gmail.com',
    nome: 'Juliana Mendes de Castro',
    data_inscricao: '2026-10-10',
    ativo: true,
  },
  {
    id: 'news-2',
    email: 'carlos.edu@gmail.com',
    nome: 'Carlos Eduardo Nogueira',
    data_inscricao: '2026-10-15',
    ativo: true,
  },
];

// Initialize seed data if not present
export function initDatabase(): void {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStored(STORAGE_KEYS.USERS, initialUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CHAT)) {
    setStored(STORAGE_KEYS.CHAT, initialChatMessages);
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    setStored(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REFERRALS)) {
    setStored(STORAGE_KEYS.REFERRALS, initialReferrals);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROMOTIONS)) {
    setStored(STORAGE_KEYS.PROMOTIONS, initialPromotions);
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZ)) {
    setStored(STORAGE_KEYS.QUIZ, initialQuizResponses);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG)) {
    setStored(STORAGE_KEYS.BLOG, initialBlogPosts);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NEWSLETTER)) {
    setStored(STORAGE_KEYS.NEWSLETTER, initialNewsletterSubscribers);
  }
}

export const db = {
  // Session / Auth
  getCurrentUser(): User | null {
    return getStored<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  setCurrentUser(user: User | null): void {
    setStored(STORAGE_KEYS.CURRENT_USER, user);
  },

  // Users
  getUsers(): User[] {
    return getStored<User[]>(STORAGE_KEYS.USERS, initialUsers);
  },
  getUserById(id: string): User | undefined {
    return this.getUsers().find((u) => u.id === id);
  },
  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  createUser(userData: Omit<User, 'id' | 'criadoEm'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      criadoEm: new Date().toISOString(),
    };
    users.unshift(newUser);
    setStored(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  // Chat
  getChatMessages(): ChatMessage[] {
    return getStored<ChatMessage[]>(STORAGE_KEYS.CHAT, initialChatMessages);
  },
  getMessagesByUser(userId: string): ChatMessage[] {
    return this.getChatMessages().filter((m) => m.usuario_id === userId);
  },
  sendMessage(data: {
    usuario_id: string;
    nome_usuario: string;
    telefone_usuario?: string;
    mensagem: string;
    remetente: 'usuario' | 'clinica';
  }): ChatMessage {
    const messages = this.getChatMessages();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      usuario_id: data.usuario_id,
      nome_usuario: data.nome_usuario,
      telefone_usuario: data.telefone_usuario,
      mensagem: data.mensagem,
      remetente: data.remetente,
      data_hora: new Date().toISOString(),
      lido: data.remetente === 'clinica',
      status: 'pendente',
    };
    messages.push(newMsg);
    setStored(STORAGE_KEYS.CHAT, messages);
    return newMsg;
  },
  updateMessageStatus(msgId: string, status: 'pendente' | 'lida' | 'atendida'): void {
    const messages = this.getChatMessages();
    const target = messages.find((m) => m.id === msgId);
    if (target) {
      target.status = status;
      if (status === 'lida' || status === 'atendida') {
        target.lido = true;
      }
      setStored(STORAGE_KEYS.CHAT, messages);
    }
  },

  // Appointments (Scheduling System)
  getAppointments(): Appointment[] {
    return getStored<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
  },
  getAppointmentsByUser(userId: string): Appointment[] {
    return this.getAppointments().filter((a) => a.usuario_id === userId);
  },
  getAvailableSlots(dateString: string): string[] {
    // Clinic hours in Mariana: 08:30 to 17:30, 45-min intervals
    const allSlots = [
      '08:30', '09:15', '10:00', '10:45', '11:30',
      '14:00', '14:45', '15:30', '16:15', '17:00'
    ];
    const bookedOnDate = this.getAppointments()
      .filter((a) => a.data === dateString && a.status !== 'cancelado')
      .map((a) => a.horario);

    return allSlots.filter((slot) => !bookedOnDate.includes(slot));
  },
  createAppointment(data: Omit<Appointment, 'id' | 'criadoEm' | 'status'>): Appointment {
    const appointments = this.getAppointments();
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      status: 'confirmado', // Automatically confirmed for immediate patient peace of mind
      criadoEm: new Date().toISOString(),
    };
    appointments.unshift(newApt);
    setStored(STORAGE_KEYS.APPOINTMENTS, appointments);
    return newApt;
  },
  updateAppointmentStatus(aptId: string, status: Appointment['status']): void {
    const list = this.getAppointments();
    const target = list.find((a) => a.id === aptId);
    if (target) {
      target.status = status;
      setStored(STORAGE_KEYS.APPOINTMENTS, list);
    }
  },

  // Referrals
  getReferrals(): Referral[] {
    return getStored<Referral[]>(STORAGE_KEYS.REFERRALS, initialReferrals);
  },
  getReferralsByUser(userId: string): Referral[] {
    return this.getReferrals().filter((r) => r.indicante_id === userId);
  },
  createReferral(data: Omit<Referral, 'id' | 'data' | 'status'>): Referral {
    const list = this.getReferrals();
    const newRef: Referral = {
      ...data,
      id: `ref-${Date.now()}`,
      data: new Date().toISOString().split('T')[0],
      status: 'pendente',
    };
    list.unshift(newRef);
    setStored(STORAGE_KEYS.REFERRALS, list);
    return newRef;
  },
  updateReferralStatus(refId: string, status: Referral['status']): void {
    const list = this.getReferrals();
    const target = list.find((r) => r.id === refId);
    if (target) {
      target.status = status;
      setStored(STORAGE_KEYS.REFERRALS, list);
    }
  },

  // Birthday Promotions
  getPromotions(): PromoRedemption[] {
    return getStored<PromoRedemption[]>(STORAGE_KEYS.PROMOTIONS, initialPromotions);
  },
  getPromotionsByUser(userId: string): PromoRedemption[] {
    return this.getPromotions().filter((p) => p.usuario_id === userId);
  },
  redeemPromotion(data: {
    usuario_id: string;
    nome_paciente: string;
    tipo: 'aniversario_clareamento' | 'aniversario_limpeza';
  }): PromoRedemption {
    const list = this.getPromotions();
    const voucher = `ANIV-MARIANA-${Date.now().toString().slice(-4)}-${data.nome_paciente.split(' ')[0].toUpperCase()}`;
    const newPromo: PromoRedemption = {
      id: `promo-${Date.now()}`,
      usuario_id: data.usuario_id,
      nome_paciente: data.nome_paciente,
      tipo: data.tipo,
      data: new Date().toISOString().split('T')[0],
      utilizada: false,
      codigo_voucher: voucher,
    };
    list.unshift(newPromo);
    setStored(STORAGE_KEYS.PROMOTIONS, list);
    return newPromo;
  },
  markPromotionUsed(promoId: string): void {
    const list = this.getPromotions();
    const target = list.find((p) => p.id === promoId);
    if (target) {
      target.utilizada = true;
      setStored(STORAGE_KEYS.PROMOTIONS, list);
    }
  },

  // Quiz Responses
  getQuizResponses(): QuizResponse[] {
    return getStored<QuizResponse[]>(STORAGE_KEYS.QUIZ, initialQuizResponses);
  },
  saveQuizResponse(data: Omit<QuizResponse, 'id' | 'data'>): QuizResponse {
    const list = this.getQuizResponses();
    const newQuiz: QuizResponse = {
      ...data,
      id: `quiz-${Date.now()}`,
      data: new Date().toISOString(),
    };
    list.unshift(newQuiz);
    setStored(STORAGE_KEYS.QUIZ, list);
    return newQuiz;
  },

  // Blog Posts & Comments
  getBlogPosts(): BlogPost[] {
    return getStored<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  },
  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.getBlogPosts().find((p) => p.slug === slug);
  },
  addBlogPost(postData: Omit<BlogPost, 'id' | 'comentarios'>): BlogPost {
    const posts = this.getBlogPosts();
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      comentarios: [],
    };
    posts.unshift(newPost);
    setStored(STORAGE_KEYS.BLOG, posts);
    return newPost;
  },
  addBlogComment(postId: string, commentData: Omit<BlogComment, 'id' | 'artigo_id' | 'data'>): BlogComment {
    const posts = this.getBlogPosts();
    const target = posts.find((p) => p.id === postId);
    const newComment: BlogComment = {
      ...commentData,
      id: `c-${Date.now()}`,
      artigo_id: postId,
      data: new Date().toISOString().split('T')[0],
    };
    if (target) {
      if (!target.comentarios) target.comentarios = [];
      target.comentarios.push(newComment);
      setStored(STORAGE_KEYS.BLOG, posts);
    }
    return newComment;
  },

  // Newsletter Subscribers (Captura de E-mails)
  getNewsletterSubscribers(): NewsletterSubscriber[] {
    return getStored<NewsletterSubscriber[]>(STORAGE_KEYS.NEWSLETTER, initialNewsletterSubscribers);
  },
  subscribeNewsletter(email: string, nome?: string): { success: boolean; message: string; subscriber?: NewsletterSubscriber } {
    const subscribers = this.getNewsletterSubscribers();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Por favor, insira um e-mail válido.' };
    }

    const existing = subscribers.find((s) => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: true, message: 'Você já faz parte da nossa lista exclusiva! Em breve receberá novas dicas.', subscriber: existing };
    }

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      nome: nome?.trim() || '',
      data_inscricao: new Date().toISOString().split('T')[0],
      ativo: true,
    };

    subscribers.unshift(newSub);
    setStored(STORAGE_KEYS.NEWSLETTER, subscribers);
    return { success: true, message: 'Inscrição realizada com carinho! Seu sorriso agradece.', subscriber: newSub };
  },
};

export const getSupabaseConfig = () => {
  const env = import.meta.env as Record<string, string | undefined>;
  const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL || '';
  const anonKey = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || '';
  return {
    url,
    anonKey,
    isConfigured: !!(url && anonKey),
  };
};

// Generates the production Supabase PostgreSQL Schema Script with Blog, Reminders and Newsletter
export const SUPABASE_SQL_SCHEMA = `-- ==============================================================
-- SCHEMA SUPABASE POSTGRESQL COMPLETO - CLÍNICA EDILENE ANDRADE
-- Mariana - MG | Pronto para colar no Supabase SQL Editor
-- ==============================================================

-- 1. Tabela de Usuários (Pacientes e Administrador)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    nascimento DATE NOT NULL,
    idade INT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    endereco TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'paciente' CHECK (tipo IN ('paciente', 'admin')),
    criado_em TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabela de Conversas do Chat Interno
CREATE TABLE IF NOT EXISTS public.conversas_chat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome_usuario TEXT NOT NULL,
    telefone_usuario TEXT,
    mensagem TEXT NOT NULL,
    remetente TEXT NOT NULL CHECK (remetente IN ('usuario', 'clinica')),
    data_hora TIMESTAMPTZ DEFAULT now(),
    lido BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'lida', 'atendida'))
);

-- 3. Tabela de Agendamentos Online com Lembretes
CREATE TABLE IF NOT EXISTS public.agendamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome_paciente TEXT NOT NULL,
    telefone_paciente TEXT NOT NULL,
    email_paciente TEXT,
    procedimento TEXT NOT NULL,
    data DATE NOT NULL,
    horario TEXT NOT NULL,
    status TEXT DEFAULT 'confirmado' CHECK (status IN ('solicitado', 'confirmado', 'concluido', 'cancelado')),
    observacoes TEXT,
    lembrete_whatsapp BOOLEAN DEFAULT true,
    lembrete_email BOOLEAN DEFAULT true,
    criado_em TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabela de Indicações (Programa Sorriso Compartilhado)
CREATE TABLE IF NOT EXISTS public.indicacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    indicante_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome_indicante TEXT NOT NULL,
    nome_indicado TEXT NOT NULL,
    telefone TEXT NOT NULL,
    relacao TEXT NOT NULL,
    data DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'atendido', 'bonificado'))
);

-- 5. Tabela de Promoções Resgatadas (Aniversariante Sorridente)
CREATE TABLE IF NOT EXISTS public.promocoes_resgatadas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nome_paciente TEXT NOT NULL,
    tipo TEXT NOT NULL,
    data DATE DEFAULT CURRENT_DATE,
    utilizada BOOLEAN DEFAULT false,
    codigo_voucher TEXT NOT NULL
);

-- 6. Tabela de Respostas do Quiz de Autoavaliação
CREATE TABLE IF NOT EXISTS public.quiz_respostas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
    nome TEXT,
    telefone TEXT,
    respostas JSONB NOT NULL,
    procedimento_sugerido TEXT NOT NULL,
    data TIMESTAMPTZ DEFAULT now()
);

-- 7. Tabela de Artigos do Blog Odontológico
CREATE TABLE IF NOT EXISTS public.artigos_blog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    categoria TEXT NOT NULL,
    resumo TEXT NOT NULL,
    conteudo TEXT[] NOT NULL,
    tempo_leitura TEXT NOT NULL,
    data_publicacao DATE DEFAULT CURRENT_DATE,
    imagem_slot TEXT,
    imagem_url TEXT,
    autor TEXT NOT NULL,
    criado_em TIMESTAMPTZ DEFAULT now()
);

-- 8. Tabela de Comentários do Blog
CREATE TABLE IF NOT EXISTS public.comentarios_blog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artigo_id UUID REFERENCES public.artigos_blog(id) ON DELETE CASCADE,
    nome_autor TEXT NOT NULL,
    cidade TEXT NOT NULL,
    comentario TEXT NOT NULL,
    data DATE DEFAULT CURRENT_DATE,
    aprovado BOOLEAN DEFAULT true
);

-- 9. Tabela de Assinantes da Newsletter (Dicas de Saúde Bucal & Novidades)
CREATE TABLE IF NOT EXISTS public.newsletter_assinantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    nome TEXT,
    data_inscricao DATE DEFAULT CURRENT_DATE,
    ativo BOOLEAN DEFAULT true
);

-- Índices otimizados
CREATE INDEX IF NOT EXISTS idx_chat_usuario ON public.conversas_chat(usuario_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data_horario ON public.agendamentos(data, horario);
CREATE INDEX IF NOT EXISTS idx_indicacoes_indicante ON public.indicacoes(indicante_id);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.artigos_blog(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_assinantes(email);
`;
