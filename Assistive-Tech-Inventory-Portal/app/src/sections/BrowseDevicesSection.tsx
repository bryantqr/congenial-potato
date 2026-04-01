import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, ArrowRight, Eye, Clock, Heart } from 'lucide-react';
import { categories, programs } from '@/data/store';
import type { Device, DeviceCategory, DeviceProgram, DeviceFilters } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface BrowseDevicesSectionProps {
  devices: Device[];
  onDeviceSelect: (device: Device) => void;
  initialFilters?: DeviceFilters;
}

const programIcons: Record<DeviceProgram, React.ReactNode> = {
  demo: <Eye className="w-4 h-4" aria-hidden="true" />,
  loan: <Clock className="w-4 h-4" aria-hidden="true" />,
  reuse: <Heart className="w-4 h-4" aria-hidden="true" />,
};

export default function BrowseDevicesSection({
  devices,
  onDeviceSelect,
  initialFilters,
}: BrowseDevicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
  const [selectedProgram, setSelectedProgram] = useState<DeviceProgram | 'all'>(
    initialFilters?.program || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | 'all'>(
    initialFilters?.category || 'all'
  );

  // Filter devices
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch =
        !searchQuery ||
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProgram = selectedProgram === 'all' || device.program === selectedProgram;
      const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
      return matchesSearch && matchesProgram && matchesCategory;
    });
  }, [devices, searchQuery, selectedProgram, selectedCategory]);

  useEffect(() => {
    if (initialFilters?.category) {
      setSelectedCategory(initialFilters.category);
    }
  }, [initialFilters]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
    const headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          header,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(headerTrigger);

    // Cards animation
    const cards = grid.querySelectorAll('.device-card');
    cards.forEach((card, index) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: index * 0.05, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(cardTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [filteredDevices]);

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

  return (
    <section
      ref={sectionRef}
      id="browse-devices"
      className="section-padding bg-[#F3F6FB]"
      aria-labelledby="browse-devices-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-8 lg:mb-12 opacity-0">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h2 id="browse-devices-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3E] mb-4">
                Featured devices
              </h2>
              <p className="text-lg text-[#5A6A8C]">
                Browse our collection of assistive technology devices.
              </p>
            </div>
            <span className="text-sm text-[#5A6A8C]">
              Showing {filteredDevices.length} of {devices.length} devices
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6A8C]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-12"
                aria-label="Search devices"
              />
            </div>

            {/* Program Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#5A6A8C]" aria-hidden="true" />
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value as DeviceProgram | 'all')}
                className="form-input py-2.5 w-40"
                aria-label="Filter by program"
              >
                <option value="all">All Programs</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as DeviceCategory | 'all')}
                className="form-input py-2.5 w-48"
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedProgram !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedProgram !== 'all' && (
                <button
                  onClick={() => setSelectedProgram('all')}
                  className="chip bg-[#0B1A3E] text-white flex items-center gap-2"
                >
                  Program: {programs.find((p) => p.id === selectedProgram)?.name}
                  <span aria-hidden="true">×</span>
                </button>
              )}
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="chip bg-[#0B1A3E] text-white flex items-center gap-2"
                >
                  Category: {categories.find((c) => c.id === selectedCategory)?.name}
                  <span aria-hidden="true">×</span>
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="chip bg-[#0B1A3E] text-white flex items-center gap-2"
                >
                  Search: "{searchQuery}"
                  <span aria-hidden="true">×</span>
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedProgram('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="chip bg-gray-200 text-gray-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Devices Grid */}
        <div ref={gridRef} className="card-grid">
          {filteredDevices.map((device) => (
            <article
              key={device.id}
              className="device-card bento-card bg-white overflow-hidden opacity-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <div className="text-6xl opacity-30">
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
                {/* Program Badge */}
                <div
                  className={`absolute top-4 left-4 chip ${getProgramStyle(device.program)} flex items-center gap-1.5`}
                >
                  {programIcons[device.program]}
                  <span className="capitalize">{device.program}</span>
                </div>
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 chip ${getStatusStyle(device.status)} text-xs`}
                >
                  {device.status.replace('-', ' ')}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <h3 className="text-lg font-bold text-[#0B1A3E] mb-2 line-clamp-1">{device.name}</h3>
                <p className="text-sm text-[#5A6A8C] mb-4 line-clamp-2">{device.description}</p>

                {/* Category Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5A6A8C] bg-gray-100 px-3 py-1 rounded-full">
                    {categories.find((c) => c.id === device.category)?.name}
                  </span>
                  <button
                    onClick={() => onDeviceSelect(device)}
                    className="inline-flex items-center text-sm font-semibold text-[#2E5BFF] hover:underline focus-ring rounded px-2 py-1"
                  >
                    View details
                    <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredDevices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <h3 className="text-xl font-bold text-[#0B1A3E] mb-2">No devices found</h3>
            <p className="text-[#5A6A8C]">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </section>
  );
}
