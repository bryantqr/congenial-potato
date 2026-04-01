import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Check, Calendar, DollarSign, Heart, Eye, Clock } from 'lucide-react';
import { categories, programs } from '@/data/store';
import type { Device, DeviceProgram } from '@/types';

interface DeviceDetailSectionProps {
  device: Device;
  onBack: () => void;
  onRequest: (device: Device) => void;
}

const programIcons: Record<DeviceProgram, React.ReactNode> = {
  demo: <Eye className="w-5 h-5" aria-hidden="true" />,
  loan: <Clock className="w-5 h-5" aria-hidden="true" />,
  reuse: <Heart className="w-5 h-5" aria-hidden="true" />,
};

export default function DeviceDetailSection({ device, onBack, onRequest }: DeviceDetailSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Entrance animation
    gsap.fromTo(
      content,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [device]);

  const getProgramStyle = (program: DeviceProgram) => {
    switch (program) {
      case 'demo':
        return 'bg-[#E6FAF5] text-[#059669]';
      case 'loan':
        return 'bg-[#E8F0FF] text-[#2E5BFF]';
      case 'reuse':
        return 'bg-[#FFF2E8] text-[#D97706]';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'on-loan':
        return 'bg-blue-100 text-blue-700';
      case 'reserved':
        return 'bg-purple-100 text-purple-700';
      case 'maintenance':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const category = categories.find((c) => c.id === device.category);
  const program = programs.find((p) => p.id === device.program);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F3F6FB] min-h-screen"
      aria-label={`Device details: ${device.name}`}
    >
      <div ref={contentRef} className="max-w-6xl mx-auto opacity-0">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center text-[#5A6A8C] hover:text-[#0B1A3E] mb-6 focus-ring rounded-lg px-3 py-2 -ml-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          Back to devices
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="order-1">
            <div className="bento-card bg-white overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-8xl lg:text-9xl opacity-40">
                  {device.category === 'vision' && '👁️'}
                  {device.category === 'hearing' && '👂'}
                  {device.category === 'speech-communication' && '💬'}
                  {device.category === 'learning-cognition' && '🧠'}
                  {device.category === 'mobility-seating' && '♿'}
                  {device.category === 'daily-living' && '🏠'}
                  {device.category === 'environmental' && '🏡'}
                  {device.category === 'computers' && '💻'}
                  {device.category === 'recreational' && '⚽'}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bento-card bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#0B1A3E]">
                  {device.cost ? `$${device.cost}` : 'Free'}
                </div>
                <div className="text-xs text-[#5A6A8C]">Value</div>
              </div>
              <div className="bento-card bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#0B1A3E]">
                  {device.donationReceived ? `$${device.donationReceived}` : '-'}
                </div>
                <div className="text-xs text-[#5A6A8C]">Donated</div>
              </div>
              <div className="bento-card bg-white p-4 text-center">
                <div className="text-2xl font-bold text-[#0B1A3E]">
                  {device.donationGiven ? `$${device.donationGiven}` : '-'}
                </div>
                <div className="text-xs text-[#5A6A8C]">Given</div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`chip ${getProgramStyle(device.program)} flex items-center gap-1.5`}>
                {programIcons[device.program]}
                <span className="capitalize">{program?.name}</span>
              </span>
              <span className={`chip ${getStatusStyle(device.status)} capitalize`}>
                {device.status.replace('-', ' ')}
              </span>
              <span className="chip bg-gray-100 text-gray-700">{category?.name}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0B1A3E] mb-4">{device.name}</h1>

            {/* Description */}
            <p className="text-lg text-[#5A6A8C] mb-8">{device.description}</p>

            {/* Specs */}
            {device.specs && device.specs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#0B1A3E] mb-4">Specifications</h2>
                <div className="bento-card bg-white p-6">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {device.specs.map((spec, index) => (
                      <div key={index}>
                        <dt className="text-sm text-[#5A6A8C] mb-1">{spec.label}</dt>
                        <dd className="font-semibold text-[#0B1A3E]">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Best For */}
            {device.bestFor && device.bestFor.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#0B1A3E] mb-4">Best for</h2>
                <div className="flex flex-wrap gap-2">
                  {device.bestFor.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E8F0FF] text-[#2E5BFF] rounded-full text-sm font-medium"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {device.availabilityDate && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 text-amber-700">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">
                    Available again: {new Date(device.availabilityDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onRequest(device)}
                disabled={device.status === 'maintenance'}
                className="btn-primary flex-1 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DollarSign className="w-5 h-5 mr-2" aria-hidden="true" />
                Request this device
              </button>
              <button
                onClick={onBack}
                className="btn-secondary inline-flex items-center justify-center"
              >
                Ask a question
              </button>
            </div>

            {/* Program Info */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h3 className="font-bold text-[#0B1A3E] mb-2">About the {program?.name} program</h3>
              <p className="text-[#5A6A8C] text-sm">{program?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
