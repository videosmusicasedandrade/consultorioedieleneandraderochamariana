import React from 'react';
import { MapPin, Navigation, MessageCircle, Clock, Phone, Mail, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const address = 'Rua Frei Durão, 45 - Centro Histórico, Mariana - MG, CEP 35420-000';
  const googleMapsUrl = 'https://maps.google.com/?q=Rua+Frei+Durao+45+Mariana+MG';
  const wazeUrl = 'https://waze.com/ul?q=Rua+Frei+Durao+45+Mariana+MG';
  const whatsAppUrl = 'https://wa.me/5531988452121?text=Ol%C3%A1%2C%20Cl%C3%ADnica%20Edilene%20Andrade!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20localiza%C3%A7%C3%A3o%20e%20agendamento.';

  return (
    <section id="localizacao" className="py-20 lg:py-28 bg-[#121212] relative overflow-hidden border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4b874]/40 text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#d4b874]" />
            Localização Privilegiada
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#ffffff] mb-3">
            Como Chegar à Clínica Edilene Andrade
          </h2>
          <p className="text-base text-[#9ca3af]">
            No coração histórico de Mariana - MG, com fácil acesso, tranquilidade e vagas próximas.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 luxury-card p-6 sm:p-8 bg-[#181818] border border-[#2b2b2b] flex flex-col justify-between">
            <div className="space-y-6">
              
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4b874] block mb-2">
                  Endereço Oficial
                </span>
                <p className="text-base font-semibold text-[#ffffff] leading-relaxed">
                  {address}
                </p>
                <p className="text-xs text-[#64b5a6] mt-1 font-medium">
                  Próximo à Praça Gomes Freire (Jardim de Mariana)
                </p>
              </div>

              {/* Operating Hours */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#e5e5e5]">
                  <Clock className="w-4 h-4 text-[#d4b874]" />
                  Horários de Atendimento:
                </div>
                <div className="text-xs text-[#9ca3af] space-y-1">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta-feira:</span>
                    <span className="font-semibold text-[#ffffff]">08:30 às 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados (Plantão Agendado):</span>
                    <span className="font-semibold text-[#ffffff]">08:30 às 12:30</span>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 text-xs text-[#9ca3af]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#d4b874]" />
                  <span>WhatsApp & Recepção: (31) 98845-2121</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#64b5a6]" />
                  <span>contato@clinicaedileneandrade.com.br</span>
                </div>
              </div>

            </div>

            {/* Action Navigation Buttons */}
            <div className="pt-8 border-t border-[#262626] space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#121212]" />
                <span>Ver no Google Maps</span>
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold w-full text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#d4b874]" />
                <span>Abrir no Waze</span>
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aqua w-full text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp Agora</span>
              </a>
            </div>

          </div>

          {/* Right Interactive Visual Map View */}
          <div className="lg:col-span-7 luxury-card overflow-hidden bg-[#161616] border border-[#2b2b2b] relative min-h-[380px] flex flex-col">
            
            {/* Styled Map Canvas Header */}
            <div className="p-4 bg-[#1f1f1f] border-b border-[#282828] flex items-center justify-between text-xs">
              <span className="text-[#e5e5e5] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#64b5a6] animate-pulse"></span>
                Mapa de Localização em Mariana - MG
              </span>
              <span className="text-[11px] text-[#d4b874]">
                Centro Histórico • CEP 35420-000
              </span>
            </div>

            {/* Map Frame Graphic */}
            <div className="relative flex-1 bg-[#141816] flex items-center justify-center p-6 text-center overflow-hidden">
              {/* Map grid lines graphic */}
              <div className="absolute inset-0 bg-[radial-gradient(#262e2a_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

              {/* Decorative Mariana landmarks visual */}
              <div className="relative z-10 max-w-md p-6 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-md border border-[#d4b874]/50 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-[#d4b874]/20 border border-[#d4b874] flex items-center justify-center text-[#d4b874] mx-auto mb-3 shadow-lg">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>

                <h4 className="font-display text-lg font-bold text-[#ffffff] mb-1">
                  Clínica Edilene Andrade
                </h4>
                <p className="text-xs text-[#9ca3af] mb-4">
                  Rua Frei Durão, 45 • Mariana - MG
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-left mb-4">
                  <div className="p-2 rounded bg-[#121212] border border-[#2a2a2a]">
                    <span className="text-[#d4b874] block font-semibold">Distâncias:</span>
                    <span className="text-[#e5e5e5]">A 120m do Jardim</span>
                  </div>
                  <div className="p-2 rounded bg-[#121212] border border-[#2a2a2a]">
                    <span className="text-[#64b5a6] block font-semibold">Estacionamento:</span>
                    <span className="text-[#e5e5e5]">Em frente e rua lateral</span>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold py-2 px-4 text-xs font-semibold w-full cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#121212]" />
                  <span>Iniciar Trajeto com GPS</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
