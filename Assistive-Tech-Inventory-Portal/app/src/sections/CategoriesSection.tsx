import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Eye,
  Ear,
  MessageCircle,
  Brain,
  Accessibility,
  HandHeart,
  Home,
  Laptop,
  Gamepad2,
} from 'lucide-react';
import { categories } from '@/data/store';
import type { DeviceCategory } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  eye: Eye,
  ear: Ear,
  'message-circle': MessageCircle,
  brain: Brain,
  wheelchair: Accessibility,
  'hand-heart': HandHeart,
  home: Home,
  laptop: Laptop,
  basketball: Gamepad2,
};

interface CategoriesSectionProps {
  onCategorySelect?: (category: DeviceCategory) => void;
}

export default function CategoriesSection({ onCategorySelect }: CategoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    if (!section || !title || !grid) return;

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
    const cards = grid.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: index * 0.06, ease: 'power3.out' }
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

  const handleCategoryClick = (categoryId: DeviceCategory) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    // Scroll to browse section
    const element = document.getElementById('browse-devices');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F3F6FB]"
      aria-labelledby="categories-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div ref={titleRef} className="mb-10 lg:mb-14 opacity-0">
          <h2 id="categories-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3E] mb-4">
            Browse by category
          </h2>
          <p className="text-lg text-[#5A6A8C] max-w-xl">
            Choose the area you want support with—we'll show available devices.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="category-card bento-card bg-white p-6 lg:p-8 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl opacity-0 focus-ring"
                style={{ borderLeft: `4px solid ${category.color}` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {IconComponent && (
                      <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg lg:text-xl font-bold text-[#0B1A3E] mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#5A6A8C]">{category.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
