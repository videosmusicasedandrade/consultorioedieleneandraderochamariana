import React, { useState, useEffect } from 'react';
import { initDatabase, db } from './services/db';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { Authority } from './components/Authority';
import { Procedures } from './components/Procedures';
import { SocialProof } from './components/SocialProof';
import { SelfAssessmentQuiz } from './components/SelfAssessmentQuiz';
import { BirthdayPromo } from './components/BirthdayPromo';
import { VirtualTour } from './components/VirtualTour';
import { ReferralProgram } from './components/ReferralProgram';
import { BlogSection } from './components/BlogSection';
import { FAQ } from './components/FAQ';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { ScheduleModal } from './components/ScheduleModal';
import { AuthModal } from './components/AuthModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { AdminPanel } from './components/AdminPanel';
import { User } from './types';

export default function App() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [patientPortalOpen, setPatientPortalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  
  const [selectedProcedureForSchedule, setSelectedProcedureForSchedule] = useState<string>('');
  const [chatInitialTopic, setChatInitialTopic] = useState<string>('');

  // Initialize persistent store and seed data on load
  useEffect(() => {
    initDatabase();
  }, []);

  const handleOpenScheduleWithProcedure = (procName: string) => {
    setSelectedProcedureForSchedule(procName);
    setScheduleModalOpen(true);
  };

  const handleOpenChatWithTopic = (topic: string) => {
    setChatInitialTopic(`Olá! Gostaria de mais detalhes sobre ${topic} na Clínica Edilene Andrade.`);
  };

  const handleOpenChatWithDiagnosis = (procName: string, summary: string) => {
    setChatInitialTopic(summary);
  };

  const handleLoginSuccess = (user: User) => {
    if (user.tipo === 'admin') {
      setAdminPanelOpen(true);
    } else {
      setPatientPortalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e5e5e5] flex flex-col selection:bg-[#d4b874] selection:text-[#121212]">
      
      {/* Fixed Header */}
      <Header
        onOpenSchedule={() => {
          setSelectedProcedureForSchedule('');
          setScheduleModalOpen(true);
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenPortal={() => setPatientPortalOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Capa / Hero */}
        <Hero
          onOpenSchedule={() => {
            setSelectedProcedureForSchedule('');
            setScheduleModalOpen(true);
          }}
          onOpenChat={() => {
            setChatInitialTopic('Olá! Gostaria de conhecer melhor os tratamentos da Clínica Edilene Andrade.');
          }}
          onExploreQuiz={() => {
            const el = document.getElementById('simulador');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Animated Statistics */}
        <StatsCounter />

        {/* Autoridade (+30 anos Mariana, CRO-MG 19135) */}
        <Authority
          onOpenSchedule={() => {
            setSelectedProcedureForSchedule('');
            setScheduleModalOpen(true);
          }}
        />

        {/* Procedimentos com Investimento e Antes/Depois */}
        <Procedures
          onSelectProcedure={handleOpenScheduleWithProcedure}
          onOpenChatWithTopic={handleOpenChatWithTopic}
        />

        {/* Prova Social e Urgência */}
        <SocialProof
          onOpenSchedule={() => {
            setSelectedProcedureForSchedule('');
            setScheduleModalOpen(true);
          }}
          onOpenChat={() => {
            setChatInitialTopic('Olá! Gostaria de consultar as vagas disponíveis para esta semana.');
          }}
        />

        {/* Simulador de Autoavaliação (3 Perguntas) */}
        <SelfAssessmentQuiz
          onOpenChatWithDiagnosis={handleOpenChatWithDiagnosis}
          onOpenScheduleWithProcedure={handleOpenScheduleWithProcedure}
        />

        {/* Tour Virtual (4 estações com tags [COLOQUE AQUI: ...]) */}
        <VirtualTour />

        {/* Promoção Aniversariante Sorridente */}
        <BirthdayPromo
          onOpenSchedule={() => {
            setSelectedProcedureForSchedule('Promoção Aniversariante Sorridente');
            setScheduleModalOpen(true);
          }}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* Programa Sorriso Compartilhado (Indicações) */}
        <ReferralProgram
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* Blog da Clínica (Cuidados Pós-Procedimento, Inovações e Comentários) */}
        <BlogSection
          onOpenScheduleWithTopic={handleOpenScheduleWithProcedure}
          onOpenChatWithTopic={handleOpenChatWithTopic}
        />

        {/* FAQ - Acordeão Suave */}
        <FAQ
          onOpenChat={() => {
            setChatInitialTopic('Olá, tenho uma dúvida sobre o atendimento da Clínica Edilene Andrade.');
          }}
        />

        {/* Como Chegar em Mariana - MG (Google Maps, Waze, WhatsApp) */}
        <LocationSection />
      </main>

      {/* Luxury Footer */}
      <Footer
        onOpenSchedule={() => {
          setSelectedProcedureForSchedule('');
          setScheduleModalOpen(true);
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAdmin={() => setAdminPanelOpen(true)}
      />

      {/* Floating Chat Widget */}
      <ChatWidget
        initialTopic={chatInitialTopic}
        onOpenSchedule={() => {
          setSelectedProcedureForSchedule('');
          setScheduleModalOpen(true);
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Modals */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        defaultProcedure={selectedProcedureForSchedule}
        onOpenAuth={() => {
          setScheduleModalOpen(false);
          setAuthModalOpen(true);
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PatientPortalModal
        isOpen={patientPortalOpen}
        onClose={() => setPatientPortalOpen(false)}
        onLogout={() => {
          setPatientPortalOpen(false);
        }}
        onOpenSchedule={() => {
          setPatientPortalOpen(false);
          setSelectedProcedureForSchedule('');
          setScheduleModalOpen(true);
        }}
      />

      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        onLogout={() => {
          setAdminPanelOpen(false);
        }}
      />

    </div>
  );
}
