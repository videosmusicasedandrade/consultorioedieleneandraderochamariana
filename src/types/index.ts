export interface User {
  id: string;
  nome: string;
  nascimento: string;
  idade: number;
  telefone: string;
  email: string;
  endereco: string;
  senha?: string;
  tipo: 'paciente' | 'admin';
  criadoEm: string;
}

export interface ChatMessage {
  id: string;
  usuario_id: string;
  nome_usuario: string;
  telefone_usuario?: string;
  mensagem: string;
  remetente: 'usuario' | 'clinica';
  data_hora: string;
  lido: boolean;
  status?: 'pendente' | 'lida' | 'atendida';
}

export interface Appointment {
  id: string;
  usuario_id: string;
  nome_paciente: string;
  telefone_paciente: string;
  email_paciente?: string;
  procedimento: string;
  data: string;
  horario: string;
  status: 'solicitado' | 'confirmado' | 'concluido' | 'cancelado';
  observacoes?: string;
  lembreteWhatsApp: boolean;
  lembreteEmail: boolean;
  criadoEm: string;
}

export interface Referral {
  id: string;
  indicante_id: string;
  nome_indicante: string;
  nome_indicado: string;
  telefone: string;
  relacao: string;
  data: string;
  status: 'pendente' | 'atendido' | 'bonificado';
}

export interface PromoRedemption {
  id: string;
  usuario_id: string;
  nome_paciente: string;
  tipo: 'aniversario_clareamento' | 'aniversario_limpeza';
  data: string;
  utilizada: boolean;
  codigo_voucher: string;
}

export interface QuizResponse {
  id: string;
  usuario_id?: string;
  nome?: string;
  telefone?: string;
  respostas: {
    escondeSorriso: string;
    incomodoPrincipal: string;
    sonhoSorriso: string;
  };
  procedimento_sugerido: string;
  data: string;
}

export interface Procedure {
  id: string;
  nome: string;
  tagline: string;
  descricaoEmocional: string;
  investimento: string;
  destaqueBadge?: string;
  imagemAntes: string;
  imagemDepois: string;
  legendaAntes: string;
  legendaDepois: string;
  beneficios: string[];
}

export interface BlogComment {
  id: string;
  artigo_id: string;
  nome_autor: string;
  cidade: string;
  comentario: string;
  data: string;
}

export interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  categoria: 'Cuidados Pós-Procedimento' | 'Inovações Odontológicas' | 'Estética & Autoestima' | 'Saúde Bucal em Família';
  resumo: string;
  conteudo: string[];
  tempoLeitura: string;
  dataPublicacao: string;
  imagemSlot: string;
  imagemUrl?: string;
  autor: string;
  comentarios?: BlogComment[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  nome?: string;
  data_inscricao: string;
  ativo: boolean;
}

