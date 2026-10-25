import React, { useState } from 'react';
import { X, UserPlus, LogIn, Heart, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { db, ADMIN_CREDENTIALS } from '../services/db';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'register',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [idade, setIdade] = useState<number | ''>('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Auto calculate age when birthdate changes
  const handleDateChange = (val: string) => {
    setNascimento(val);
    if (val) {
      const birth = new Date(val);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge >= 0 && calculatedAge < 120) {
        setIdade(calculatedAge);
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!nome.trim() || !nascimento || !telefone.trim() || !email.trim() || !senha.trim() || !endereco.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Check if email already registered
    const existing = db.getUserByEmail(email);
    if (existing) {
      setErrorMessage('Este e-mail já está cadastrado. Por favor, acesse a aba "Entrar".');
      return;
    }

    const newUser = db.createUser({
      nome: nome.trim(),
      nascimento,
      idade: typeof idade === 'number' ? idade : 25,
      telefone: telefone.trim(),
      email: email.trim().toLowerCase(),
      endereco: endereco.trim(),
      senha,
      tipo: 'paciente',
    });

    db.setCurrentUser(newUser);

    // Exact required welcome message
    setSuccessMessage('Bem-vindo(a) à família Edilene Andrade! Seu sorriso merecido está mais perto do que você imagina.');

    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // Check admin credentials
    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && senha === ADMIN_CREDENTIALS.senha) {
      let adminUser = db.getUserByEmail(cleanEmail);
      if (!adminUser) {
        adminUser = {
          id: 'admin-edilene',
          nome: ADMIN_CREDENTIALS.nome,
          nascimento: '1970-05-14',
          idade: 56,
          telefone: '(31) 98845-2121',
          email: ADMIN_CREDENTIALS.email,
          endereco: 'Rua Frei Durão, 45 - Centro Histórico, Mariana - MG',
          senha: ADMIN_CREDENTIALS.senha,
          tipo: 'admin',
          criadoEm: new Date().toISOString(),
        };
      }
      db.setCurrentUser(adminUser);
      onLoginSuccess(adminUser);
      onClose();
      return;
    }

    // Check patient credentials
    const user = db.getUserByEmail(cleanEmail);
    if (!user || user.senha !== senha) {
      setErrorMessage('E-mail ou senha incorretos. Verifique suas credenciais.');
      return;
    }

    db.setCurrentUser(user);
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#181818] border border-[#d4b874]/60 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header with Switcher */}
        <div className="p-5 sm:p-6 bg-[#1f1f1f] border-b border-[#2a2a2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874]">
              {mode === 'register' ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#ffffff]">
                {mode === 'register' ? 'Criar Sua Conta de Paciente' : 'Acessar Área do Paciente'}
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Clínica Edilene Andrade • Mariana - MG
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

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-[#121212] border-b border-[#262626]">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-[#d4b874] text-[#121212] shadow'
                : 'text-[#9ca3af] hover:text-[#ffffff]'
            }`}
          >
            Novo Cadastro (Acesso Imediato)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#d4b874] text-[#121212] shadow'
                : 'text-[#9ca3af] hover:text-[#ffffff]'
            }`}
          >
            Já Tenho Conta / Entrar
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {successMessage ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#64b5a6]/20 border-2 border-[#64b5a6] text-[#64b5a6] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#ffffff]">
                Cadastro Realizado!
              </h4>
              <p className="text-sm text-[#e5e5e5] italic leading-relaxed max-w-sm mx-auto font-serif">
                "{successMessage}"
              </p>
              <div className="text-xs text-[#64b5a6] animate-pulse">
                Acesso liberado na hora sem confirmação de e-mail...
              </div>
            </div>
          ) : mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              
              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    required
                    value={nascimento}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    Idade (calculada automaticamente) *
                  </label>
                  <input
                    type="number"
                    required
                    value={idade}
                    onChange={(e) => setIdade(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Idade"
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(31) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Endereço Completo (Rua, Número, Bairro em Mariana ou Região) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rua das Rosas, 120 - Bairro Bauxita, Mariana - MG"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Senha de Acesso *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Crie sua senha segura"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] text-[11px] text-[#9ca3af] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#64b5a6] shrink-0" />
                <span>Seus dados são protegidos com segurança. Acesso imediato sem confirmação de e-mail.</span>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-xs text-red-400 p-3 rounded-lg bg-red-950/40 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-gold w-full py-3 text-sm font-bold cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Concluir Cadastro & Entrar</span>
              </button>

            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Seu E-mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e5e5e5] mb-1">
                  Sua Senha *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2d2d2d] focus:border-[#d4b874] focus:ring-1 focus:ring-[#d4b874] rounded-xl px-4 py-2.5 text-sm text-[#ffffff] outline-none transition-all"
                />
              </div>

              {/* Quick tip for admin test */}
              <div className="p-3 rounded-xl bg-[#1d1b16] border border-[#d4b874]/30 text-[11px] text-[#d4b874] space-y-1">
                <span className="font-bold block">Acesso Dra. Edilene (Administrador):</span>
                <div className="flex justify-between font-mono text-[10px] text-[#e5e5e5]">
                  <span>Login: edilenerocha@gmail.com</span>
                  <span>Senha: edilene55@</span>
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-xs text-red-400 p-3 rounded-lg bg-red-950/40 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-gold w-full py-3 text-sm font-bold cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Entrar na Minha Conta</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
