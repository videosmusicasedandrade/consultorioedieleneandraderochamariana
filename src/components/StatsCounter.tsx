import React, { useEffect, useState, useRef } from 'react';
import { Award, Users, Heart, Star } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      icon: <Award className="w-6 h-6 text-[#d4b874]" />,
      target: 30,
      prefix: '+',
      label: 'Anos de Excelência',
      description: 'Três décadas cuidando de sorrisos em Mariana - MG',
    },
    {
      icon: <Users className="w-6 h-6 text-[#64b5a6]" />,
      target: 15000,
      prefix: '+',
      label: 'Milhares de Sorrisos',
      description: 'De sorrisos já transformados e vidas renovadas',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#d4b874]" />,
      target: 1,
      prefix: '#',
      label: 'Lugar Onde Você é Família',
      description: 'Acolhimento humanizado e atenção aos mínimos detalhes',
    },
    {
      icon: <Star className="w-6 h-6 text-[#64b5a6]" />,
      target: 99,
      suffix: '%',
      label: 'Satisfação & Confiança',
      description: 'Índice de pacientes que recomendam a amigos e parentes',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-[#161616] border-y border-[#262626] relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#d4b874]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} startAnimation={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ stat: StatItem; startAnimation: boolean }> = ({
  stat,
  startAnimation,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * stat.target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(stat.target);
      }
    };

    requestAnimationFrame(animate);
  }, [startAnimation, stat.target]);

  const formattedCount =
    stat.target >= 1000 ? count.toLocaleString('pt-BR') : count;

  return (
    <div className="luxury-card p-6 flex flex-col items-center text-center group">
      <div className="w-14 h-14 rounded-2xl bg-[#1f1f1f] border border-[#2d2d2d] flex items-center justify-center mb-4 group-hover:border-[#d4b874]/50 group-hover:scale-105 transition-all duration-300 shadow-inner">
        {stat.icon}
      </div>

      <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight mb-1 flex items-center">
        {stat.prefix && <span className="text-[#d4b874] mr-0.5">{stat.prefix}</span>}
        <span>{formattedCount}</span>
        {stat.suffix && <span className="text-[#d4b874] ml-0.5">{stat.suffix}</span>}
      </div>

      <h3 className="text-sm font-semibold text-[#e5e5e5] uppercase tracking-wider mb-2">
        {stat.label}
      </h3>

      <p className="text-xs text-[#9ca3af] leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
};
