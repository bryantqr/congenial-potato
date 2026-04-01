import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterSectionProps {
  onAdminClick: () => void;
}

export default function FooterSection({ onAdminClick }: FooterSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B1A3E] text-white py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#2E5BFF] rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">AT</span>
              </div>
              <span className="text-xl font-bold">Device Manager</span>
            </div>
            <p className="text-gray-400 mb-6">
              Assistive tech, organized for people. Browse, demo, loan, and receive devices that
              support independence.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@atdevices.org"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                hello@atdevices.org
              </a>
              <a
                href="tel:5550142200"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                (555) 014-2200
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                123 Main Street, City, ST 12345
              </div>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-lg font-bold mb-4">Browse</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('browse-devices')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Devices
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('categories-section')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h3 className="text-lg font-bold mb-4">Admin</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onAdminClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Admin Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={onAdminClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Manage Devices
                </button>
              </li>
              <li>
                <button
                  onClick={onAdminClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  View Requests
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('accessibility-section')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accessibility
                </button>
              </li>
              <li>
                <a
                  href="mailto:help@atdevices.org"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="mailto:feedback@atdevices.org"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Assistive Technology Device Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
