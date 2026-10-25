import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, User, ShieldCheck, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { db } from '../services/db';

interface HeaderProps {
  onOpenSchedule: () => void;
  onOpenAuth: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSchedule,
  onOpenAuth,
  onOpenPortal,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(db.getCurrentUser());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleUpdate = () => {
      setCurrentUser(db.getCurrentUser());
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('database-updated', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('database-updated', handleUpdate);
    };
  }, []);

  const navLinks = [
    { label: 'Autoridade', href: '#autoridade' },
    { label: 'Procedimentos', href: '#procedimentos' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Tour Virtual', href: '#tour' },
    { label: 'Blog', href: '#blog' },
    { label: 'Indicações', href: '#indicacoes' },
    { label: 'Aniversariante', href: '#aniversario' },
    { label: 'Como Chegar', href: '#localizacao' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#262626] py-3.5 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group text-left cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d4b874] to-[#f3dfa2] flex items-center justify-center text-[#121212] font-display font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
                EA
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base sm:text-lg font-bold text-[#ffffff] tracking-wider group-hover:text-[#d4b874] transition-colors leading-tight">
                  Edilene Andrade
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#d4b874] font-medium flex items-center gap-1">
                  Mariana - MG <span className="text-[#64b5a6]">• CRO-MG 19135</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs font-medium text-[#d1d5db] hover:text-[#d4b874] transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {currentUser?.tipo === 'admin' ? (
                <button
                  onClick={onOpenAdmin}
                  className="px-3.5 py-2 rounded-full bg-[#d4b874]/20 border border-[#d4b874] text-[#d4b874] text-xs font-bold hover:bg-[#d4b874]/30 cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Painel Dra. Edilene</span>
                </button>
              ) : currentUser ? (
                <button
                  onClick={onOpenPortal}
                  className="px-3.5 py-2 rounded-full bg-[#1e1e1e] border border-[#2e2e2e] hover:border-[#d4b874] text-[#ffffff] text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-[#d4b874]" />
                  <span>Olá, {currentUser.nome.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#e5e5e5] hover:text-[#d4b874] transition-colors cursor-pointer"
                >
                  Área do Paciente
                </button>
              )}

              <button
                onClick={onOpenSchedule}
                className="btn-gold py-2 px-4 text-xs font-bold cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#121212]" />
                <span>Agendar Avaliação</span>
              </button>
            </div>

            {/* Mobile Hamburger Button (Touch target >= 44px) */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onOpenSchedule}
                className="sm:hidden btn-gold py-1.5 px-3 text-[11px] font-bold cursor-pointer"
              >
                Agendar
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-11 h-11 rounded-xl bg-[#1e1e1e] border border-[#2e2e2e] text-[#d4b874] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#282828]"
                aria-label="Abrir Menu de Navegação"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer (Slides from Right, touch targets >= 44px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs bg-[#161616] border-l border-[#2e2e2e] h-full flex flex-col justify-between p-6 shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
                <div>
                  <h4 className="font-display text-sm font-bold text-[#ffffff]">
                    Clínica Edilene Andrade
                  </h4>
                  <span className="text-[10px] text-[#d4b874]">
                    Mariana - MG • CRO-MG 19135
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 rounded-lg bg-[#222] text-[#9ca3af] hover:text-[#ffffff] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links (>=44px touch targets) */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-lg text-left text-sm font-medium text-[#e5e5e5] hover:bg-[#222] hover:text-[#d4b874] transition-colors flex items-center cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#262626] space-y-3">
              {currentUser?.tipo === 'admin' ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#d4b874]/20 border border-[#d4b874] text-[#d4b874] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Painel Dra. Edilene</span>
                </button>
              ) : currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#222] border border-[#333] text-[#ffffff] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#d4b874]" />
                  <span>Área do Paciente ({currentUser.nome.split(' ')[0]})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="btn-outline-gold w-full min-h-[44px] text-xs font-semibold cursor-pointer"
                >
                  Entrar / Cadastrar
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSchedule();
                }}
                className="btn-gold w-full min-h-[44px] text-xs font-bold cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#121212]" />
                <span>Agendar Avaliação</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
