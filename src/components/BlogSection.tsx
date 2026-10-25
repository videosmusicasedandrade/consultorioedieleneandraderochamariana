import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, User, MessageCircle, Send, ArrowRight, X, Sparkles, Share2, Check } from 'lucide-react';
import { db } from '../services/db';
import { BlogPost, BlogComment } from '../types';
import { PhotoSlot } from './PhotoSlot';

interface BlogSectionProps {
  onOpenScheduleWithTopic: (topic: string) => void;
  onOpenChatWithTopic: (topic: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenScheduleWithTopic,
  onOpenChatWithTopic,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  
  // Comment form state inside reader
  const [commentName, setCommentName] = useState('');
  const [commentCity, setCommentCity] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const currentUser = db.getCurrentUser();

  const loadPosts = () => {
    setPosts(db.getBlogPosts());
  };

  useEffect(() => {
    loadPosts();

    const handleUpdate = () => loadPosts();
    window.addEventListener('database-updated', handleUpdate);
    return () => window.removeEventListener('database-updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCommentName(currentUser.nome);
      setCommentCity('Mariana - MG');
    }
  }, [currentUser]);

  const categories = [
    'Todos',
    'Cuidados Pós-Procedimento',
    'Inovações Odontológicas',
    'Estética & Autoestima',
    'Saúde Bucal em Família',
  ];

  const filteredPosts =
    selectedCategory === 'Todos'
      ? posts
      : posts.filter((p) => p.categoria === selectedCategory);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle || !commentName.trim() || !commentText.trim()) return;

    db.addBlogComment(activeArticle.id, {
      nome_autor: commentName.trim(),
      cidade: commentCity.trim() || 'Mariana - MG',
      comentario: commentText.trim(),
    });

    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);

    // Refresh active article comments
    const updated = db.getBlogPostBySlug(activeArticle.slug);
    if (updated) {
      setActiveArticle(updated);
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-[#141414] border-t border-[#262626] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Blog da Saúde & Estética Bucal
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Conhecimento Que Transforma Sorrisos
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            Orientações práticas de pós-operatório, novidades da odontologia moderna e dicas para cuidar do seu sorriso em Mariana.
          </p>

          {/* Categories Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#d4b874] text-[#121212] font-semibold shadow-md'
                    : 'bg-[#1e1e1e] text-[#9ca3af] hover:text-[#ffffff] hover:bg-[#282828] border border-[#2b2b2b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="luxury-card overflow-hidden bg-[#181818] border border-[#2a2a2a] flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveArticle(post)}
            >
              <div>
                {/* Photo slot */}
                <div className="p-3 pb-0">
                  <PhotoSlot
                    label={post.imagemSlot}
                    tagText={post.imagemSlot}
                    alt={post.titulo}
                    aspectRatio="video"
                    src={post.imagemUrl}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  {/* Category & Time */}
                  <div className="flex items-center justify-between text-xs text-[#9ca3af] mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64b5a6] px-2.5 py-0.5 rounded-md bg-[#64b5a6]/10 border border-[#64b5a6]/20">
                      {post.categoria}
                    </span>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#d4b874]" />
                      <span>{post.tempoLeitura}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#ffffff] group-hover:text-[#d4b874] transition-colors leading-snug mb-3">
                    {post.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9ca3af] line-clamp-3 leading-relaxed mb-4">
                    {post.resumo}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-[#242424] text-xs">
                <div className="flex items-center gap-2 text-[#9ca3af]">
                  <Calendar className="w-3.5 h-3.5 text-[#d4b874]" />
                  <span>{post.dataPublicacao.split('-').reverse().join('/')}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#64b5a6] flex items-center gap-1 text-xs font-semibold">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comentarios?.length || 0}
                  </span>
                  <span className="text-[#d4b874] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal for Detailed Article & Commenting */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#181818] border border-[#d4b874]/60 rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#1f1f1f] border-b border-[#2a2a2a] flex items-center justify-between shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64b5a6] px-2.5 py-1 rounded bg-[#64b5a6]/15">
                {activeArticle.categoria}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-[#262626] text-[#9ca3af] hover:text-[#ffffff] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#ffffff] leading-tight mb-3">
                  {activeArticle.titulo}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#9ca3af] pb-4 border-b border-[#262626]">
                  <span className="flex items-center gap-1.5 text-[#d4b874]">
                    <User className="w-4 h-4" />
                    {activeArticle.autor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeArticle.dataPublicacao.split('-').reverse().join('/')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeArticle.tempoLeitura}
                  </span>
                </div>
              </div>

              {/* Photo */}
              <PhotoSlot
                label={activeArticle.imagemSlot}
                tagText={activeArticle.imagemSlot}
                alt={activeArticle.titulo}
                aspectRatio="video"
                src={activeArticle.imagemUrl}
              />

              {/* Body paragraphs */}
              <div className="space-y-4 text-sm text-[#e5e5e5] leading-relaxed font-light">
                {activeArticle.conteudo.map((p, idx) => (
                  <p key={idx} className="text-justify">
                    {p}
                  </p>
                ))}
              </div>

              {/* CTA Inside Article */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1c1c1c] via-[#221e16] to-[#1c1c1c] border border-[#d4b874]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-base font-bold text-[#ffffff] mb-1">
                    Ficou com alguma dúvida sobre o seu caso?
                  </h4>
                  <p className="text-xs text-[#9ca3af]">
                    A equipe da Clínica Edilene Andrade está pronta para acolher você em Mariana.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const topic = activeArticle.titulo;
                      setActiveArticle(null);
                      onOpenScheduleWithTopic(topic);
                    }}
                    className="btn-gold py-2 px-3.5 text-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Agendar Avaliação</span>
                  </button>
                  <button
                    onClick={() => {
                      const topic = activeArticle.titulo;
                      setActiveArticle(null);
                      onOpenChatWithTopic(topic);
                    }}
                    className="btn-outline-gold py-2 px-3.5 text-xs cursor-pointer"
                  >
                    <span>Falar no Chat</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t border-[#262626]">
                <h3 className="font-display text-lg font-bold text-[#ffffff] mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#64b5a6]" />
                  Comentários dos Leitores ({activeArticle.comentarios?.length || 0})
                </h3>

                {/* Existing comments */}
                <div className="space-y-3 mb-6">
                  {activeArticle.comentarios && activeArticle.comentarios.length > 0 ? (
                    activeArticle.comentarios.map((c) => (
                      <div key={c.id} className="p-3.5 rounded-xl bg-[#141414] border border-[#2a2a2a] text-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#ffffff]">{c.nome_autor}</span>
                          <span className="text-[10px] text-[#9ca3af]">{c.cidade} • {c.data.split('-').reverse().join('/')}</span>
                        </div>
                        <p className="text-[#d1d5db] leading-relaxed">{c.comentario}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#9ca3af] italic">
                      Seja o primeiro a deixar um comentário sobre este artigo!
                    </p>
                  )}
                </div>

                {/* Add comment form */}
                <form onSubmit={handleAddComment} className="p-4 rounded-xl bg-[#141414] border border-[#2d2d2d] space-y-3">
                  <span className="text-xs font-semibold text-[#d4b874] block">
                    Deixe sua pergunta ou relato sobre este tema:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                      className="w-full bg-[#1c1c1c] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none focus:border-[#d4b874]"
                    />
                    <input
                      type="text"
                      placeholder="Sua cidade / bairro (Ex: Mariana - Bauxita)"
                      value={commentCity}
                      onChange={(e) => setCommentCity(e.target.value)}
                      className="w-full bg-[#1c1c1c] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none focus:border-[#d4b874]"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Escreva seu comentário..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    className="w-full bg-[#1c1c1c] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#ffffff] outline-none focus:border-[#d4b874] resize-none"
                  />

                  {commentSuccess && (
                    <div className="p-2.5 rounded-lg bg-[#64b5a6]/20 border border-[#64b5a6]/30 text-xs text-[#64b5a6] flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Obrigado por compartilhar! Seu comentário foi publicado.
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-gold py-2 px-4 text-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#121212]" />
                      <span>Publicar Comentário</span>
                    </button>
                  </div>
                </form>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
