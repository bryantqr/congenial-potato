import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Calendar, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Find by need',
    description: 'Pick a category that matches your goals. Browse devices by type of support you need.',
    icon: Search,
    color: 'bg-[#E8F0FF]',
    iconColor: 'text-[#2E5BFF]',
  },
  {
    number: '02',
    title: 'Check availability',
    description: "See what's in stock for demo, loan, or reuse. Real-time status updates.",
    icon: Calendar,
    color: 'bg-[#E6FAF5]',
    iconColor: 'text-[#059669]',
  },
  {
    number: '03',
    title: 'Request',
    description: 'Submit a request and we\'ll confirm within 1–2 days. Simple and straightforward.',
    icon: Send,
    color: 'bg-[#FFF2E8]',
    iconColor: 'text-[#D97706]',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    if (!section || !title || !cards) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    const titleTrigger = ScrollTrigger.create({
      trigger: title,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          title,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(titleTrigger);

    // Cards animation
    const cardElements = cards.querySelectorAll('.step-card');
    cardElements.forEach((card, index) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 60, scale: 0.98, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.7, delay: index * 0.15, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(cardTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F3F6FB]"
      aria-labelledby="how-it-works-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16 opacity-0">
          <h2 id="how-it-works-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3E] mb-4">
            How it works
          </h2>
          <p className="text-lg text-[#5A6A8C] max-w-2xl mx-auto">
            Search by need, check availability, and request in minutes.
          </p>
          {/* Decorative underline */}
          <div className="mt-4 flex justify-center" aria-hidden="true">
            <svg width="120" height="4" viewBox="0 0 120 4" fill="none">
              <rect width="120" height="4" rx="2" fill="#2E5BFF" fillOpacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Steps Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="step-card bento-card bg-white p-8 lg:p-10 opacity-0"
              >
                {/* Step Number */}
                <span
                  className="text-5xl lg:text-6xl font-bold text-[#0B1A3E]/10 mb-6 block"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <IconComponent className={`w-7 h-7 ${step.iconColor}`} aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-[#0B1A3E] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#5A6A8C] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
