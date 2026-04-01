import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Keyboard, Volume2, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AccessibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const trigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          content,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F3F6FB]"
      aria-labelledby="accessibility-title"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={contentRef} className="text-center opacity-0">
          {/* Icons */}
          <div className="flex justify-center gap-4 mb-8" aria-hidden="true">
            <div className="w-14 h-14 bg-[#E8F0FF] rounded-2xl flex items-center justify-center">
              <Eye className="w-7 h-7 text-[#2E5BFF]" />
            </div>
            <div className="w-14 h-14 bg-[#E6FAF5] rounded-2xl flex items-center justify-center">
              <Keyboard className="w-7 h-7 text-[#059669]" />
            </div>
            <div className="w-14 h-14 bg-[#F2EEFF] rounded-2xl flex items-center justify-center">
              <Volume2 className="w-7 h-7 text-[#8B5CF6]" />
            </div>
          </div>

          <h2 id="accessibility-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3E] mb-6">
            Accessibility
          </h2>

          <div className="prose prose-lg mx-auto text-[#5A6A8C] mb-8">
            <p>
              This site is designed to work with screen readers, keyboard navigation, and
              high-contrast settings. We are committed to ensuring that everyone can access
              assistive technology information and services.
            </p>
            <p>
              Our website follows WCAG 2.1 Level AA guidelines and includes features such as:
            </p>
            <ul className="text-left inline-block">
              <li>Full keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>High contrast text and visual elements</li>
              <li>Clear focus indicators</li>
              <li>Skip navigation links</li>
              <li>Reduced motion support</li>
            </ul>
          </div>

          <a
            href="mailto:accessibility@atdevices.org"
            className="btn-secondary inline-flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
            Contact support
          </a>
        </div>
      </div>
    </section>
  );
}
