import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Clock, Heart, ArrowRight } from 'lucide-react';
import type { DeviceProgram } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ProgramPanelProps {
  program: DeviceProgram;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  delay: number;
}

function ProgramPanel({ program, title, description, icon, bgColor, delay }: ProgramPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const image = imageRef.current;
    if (!panel || !image) return;

    // Entrance animation
    gsap.fromTo(
      panel,
      { y: 60, scale: 0.96, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.9, delay, ease: 'power3.out' }
    );

    // Float animation for image
    gsap.to(image, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, [delay]);

  const handleClick = () => {
    const element = document.getElementById('browse-devices');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={panelRef}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
      className={`bento-card ${bgColor} p-6 lg:p-8 cursor-pointer bento-card-hover relative overflow-hidden`}
      style={{ minHeight: '280px' }}
      aria-label={`${title}: ${description}`}
    >
      {/* Icon Badge */}
      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow-sm">
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl lg:text-2xl font-bold text-[#0B1A3E] mb-2">{title}</h3>
        <p className="text-sm lg:text-base text-[#5A6A8C] mb-4">{description}</p>
        <span className="inline-flex items-center text-sm font-semibold text-[#2E5BFF] group">
          Explore
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-2 border-[#0B1A3E]/5" aria-hidden="true" />
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border-2 border-[#0B1A3E]/5" aria-hidden="true" />

      {/* Product Image Placeholder */}
      <div
        ref={imageRef}
        className="absolute bottom-4 right-4 w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-white/60 shadow-lg flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="text-4xl lg:text-5xl opacity-40">
          {program === 'demo' && '🔍'}
          {program === 'loan' && '💬'}
          {program === 'reuse' && '🖱️'}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const panelsContainer = panelsContainerRef.current;
    if (!section || !headline || !panelsContainer) return;

    // Split headline into words for animation
    const words = headline.querySelectorAll('.word');

    // Entrance animation on load
    gsap.fromTo(
      words,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out', delay: 0.3 }
    );

    // Scroll-driven exit animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=130%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;

        // Exit phase (70% - 100%)
        if (progress > 0.7) {
          const exitProgress = (progress - 0.7) / 0.3;
          const opacity = Math.max(0, 1 - exitProgress * 1.5);
          const yOffset = exitProgress * 100;

          gsap.set(headline, { y: -yOffset * 0.5, opacity });
          gsap.set(panelsContainer, { y: yOffset * 0.8, opacity, scale: 1 - exitProgress * 0.02 });
        } else {
          gsap.set(headline, { y: 0, opacity: 1 });
          gsap.set(panelsContainer, { y: 0, opacity: 1, scale: 1 });
        }
      },
      onLeaveBack: () => {
        // Reset to visible when scrolling back to top
        gsap.set(headline, { y: 0, opacity: 1 });
        gsap.set(panelsContainer, { y: 0, opacity: 1, scale: 1 });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  const scrollToBrowse = () => {
    const element = document.getElementById('browse-devices');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F3F6FB] overflow-hidden z-10"
      aria-label="Home"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(46, 91, 255, 0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 lg:pt-32">
        {/* Headline Block */}
        <div ref={headlineRef} className="max-w-3xl mb-8 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0B1A3E] leading-tight mb-6">
            <span className="word inline-block">Assistive</span>{' '}
            <span className="word inline-block">technology,</span>{' '}
            <span className="word inline-block">made</span>{' '}
            <span className="word inline-block">simple.</span>
          </h1>
          <p className="text-lg lg:text-xl text-[#5A6A8C] max-w-xl mb-8">
            Browse devices you can demo, borrow, or receive—organized for real needs.
          </p>
          <button onClick={scrollToBrowse} className="btn-secondary inline-flex items-center">
            Browse all devices
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </button>
        </div>

        {/* Three Bento Panels */}
        <div
          ref={panelsContainerRef}
          className="flex-1 flex items-end pb-8 lg:pb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full max-w-7xl mx-auto">
            <ProgramPanel
              program="demo"
              title="Demo devices"
              description="Try in-person at our center."
              icon={<Eye className="w-6 h-6 text-[#059669]" aria-hidden="true" />}
              bgColor="bg-[#E6FAF5]"
              delay={0.4}
            />
            <ProgramPanel
              program="loan"
              title="Loan devices"
              description="Borrow for 2–6 weeks."
              icon={<Clock className="w-6 h-6 text-[#2E5BFF]" aria-hidden="true" />}
              bgColor="bg-[#E8F0FF]"
              delay={0.52}
            />
            <ProgramPanel
              program="reuse"
              title="Reuse devices"
              description="Gently used, donated to you."
              icon={<Heart className="w-6 h-6 text-[#D97706]" aria-hidden="true" />}
              bgColor="bg-[#FFF2E8]"
              delay={0.64}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
