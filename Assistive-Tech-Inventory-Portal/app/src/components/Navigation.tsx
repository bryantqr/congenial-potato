import { useState, useEffect } from 'react';
import { Menu, X, User, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onAdminClick: () => void;
  onRequestClick: () => void;
}

export default function Navigation({ onAdminClick, onRequestClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Browse', action: () => scrollToSection('browse-devices') },
    { label: 'Categories', action: () => scrollToSection('categories-section') },
    { label: 'How it works', action: () => scrollToSection('how-it-works') },
  ];

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 focus-ring rounded-lg px-2 py-1 -ml-2"
            >
              <div className="w-9 h-9 bg-[#2E5BFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AT</span>
              </div>
              <span
                className={`font-bold text-lg hidden sm:block ${
                  isScrolled ? 'text-[#0B1A3E]' : 'text-[#0B1A3E]'
                }`}
              >
                Device Manager
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className={`font-medium transition-colors focus-ring rounded-lg px-3 py-2 ${
                    isScrolled
                      ? 'text-[#5A6A8C] hover:text-[#0B1A3E]'
                      : 'text-[#5A6A8C] hover:text-[#0B1A3E]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onAdminClick}
                className={`hidden sm:flex items-center gap-2 font-medium transition-colors focus-ring rounded-lg px-3 py-2 ${
                  isScrolled
                    ? 'text-[#5A6A8C] hover:text-[#0B1A3E]'
                    : 'text-[#5A6A8C] hover:text-[#0B1A3E]'
                }`}
                aria-label="Admin login"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                <span>Admin</span>
              </button>
              <button
                onClick={onRequestClick}
                className="btn-primary text-sm py-2.5 px-4 inline-flex items-center"
              >
                Request a device
                <ArrowRight className="w-4 h-4 ml-2 hidden sm:block" aria-hidden="true" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus-ring"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0B1A3E]" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6 text-[#0B1A3E]" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="block w-full text-left px-4 py-3 text-[#0B1A3E] font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onAdminClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-[#0B1A3E] font-medium hover:bg-gray-50 rounded-lg transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
