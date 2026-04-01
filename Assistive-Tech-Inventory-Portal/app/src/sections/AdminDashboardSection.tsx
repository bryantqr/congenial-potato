import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Package,
  ClipboardList,
  HandHeart,
  TrendingUp,
  Plus,
  List,
  LogOut,
} from 'lucide-react';
import type { Device, DeviceRequest, Analytics } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface AdminDashboardSectionProps {
  devices: Device[];
  requests: DeviceRequest[];
  analytics: Analytics;
  onAddDevice: () => void;
  onViewRequests: () => void;
  onViewDevices: () => void;
  onLogout: () => void;
}

export default function AdminDashboardSection({
  devices,
  requests,
  analytics,
  onAddDevice,
  onViewRequests,
  onViewDevices,
  onLogout,
}: AdminDashboardSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Calculate stats
  const totalDevices = devices.length;
  const openRequests = requests.filter((r) => r.status === 'pending').length;
  const loanedNow = devices.filter((d) => d.status === 'on-loan').length;
  const reuseGiven = devices.filter((d) => d.program === 'reuse' && d.status === 'on-loan').length;

  useEffect(() => {
    const stats = statsRef.current;
    const actions = actionsRef.current;
    if (!stats || !actions) return;

    const triggers: ScrollTrigger[] = [];

    // Stats animation
    const statCards = stats.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 50, scale: 0.96, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.6, delay: index * 0.1, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(trigger);
    });

    // Actions animation
    const actionCards = actions.querySelectorAll('.action-card');
    actionCards.forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.3 + index * 0.15, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const stats = [
    {
      label: 'Total Devices',
      value: totalDevices,
      icon: Package,
      color: 'bg-[#E8F0FF]',
      iconColor: 'text-[#2E5BFF]',
    },
    {
      label: 'Open Requests',
      value: openRequests,
      icon: ClipboardList,
      color: 'bg-[#FFF2E8]',
      iconColor: 'text-[#D97706]',
    },
    {
      label: 'Loaned Now',
      value: loanedNow,
      icon: TrendingUp,
      color: 'bg-[#E6FAF5]',
      iconColor: 'text-[#059669]',
    },
    {
      label: 'Reuse Given',
      value: reuseGiven,
      icon: HandHeart,
      color: 'bg-[#F2EEFF]',
      iconColor: 'text-[#8B5CF6]',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F3F6FB]"
      aria-labelledby="admin-dashboard-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-12">
          <div>
            <h1 id="admin-dashboard-title" className="text-3xl lg:text-4xl font-bold text-[#0B1A3E]">
              Admin Dashboard
            </h1>
            <p className="text-[#5A6A8C] mt-1">Manage devices, requests, and view analytics.</p>
          </div>
          <button onClick={onLogout} className="btn-secondary inline-flex items-center self-start">
            <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
            Log out
          </button>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-card bento-card bg-white p-6 opacity-0"
              >
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} aria-hidden="true" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#0B1A3E] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#5A6A8C]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div ref={actionsRef}>
          <h2 className="text-xl font-bold text-[#0B1A3E] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <button
              onClick={onAddDevice}
              className="action-card bento-card bg-white p-6 lg:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 focus-ring"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#E8F0FF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Plus className="w-7 h-7 text-[#2E5BFF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1A3E] mb-1">Add a new device</h3>
                  <p className="text-sm text-[#5A6A8C]">
                    Add a new assistive technology device to the catalog.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onViewRequests}
              className="action-card bento-card bg-white p-6 lg:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 focus-ring"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#E6FAF5] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <List className="w-7 h-7 text-[#059669]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1A3E] mb-1">View all requests</h3>
                  <p className="text-sm text-[#5A6A8C]">
                    Manage pending and completed device requests.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onViewDevices}
              className="action-card bento-card bg-white p-6 lg:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 focus-ring md:col-span-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#FFF2E8] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-7 h-7 text-[#D97706]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1A3E] mb-1">Manage devices</h3>
                  <p className="text-sm text-[#5A6A8C]">
                    Edit device details, update availability, and track inventory.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Analytics Preview */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#0B1A3E] mb-6">Analytics Overview</h2>
          <div className="bento-card bg-white p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-[#5A6A8C] mb-1">Total Visits</div>
                <div className="text-2xl font-bold text-[#0B1A3E]">{analytics.totalVisits.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-[#5A6A8C] mb-1">Unique Visitors</div>
                <div className="text-2xl font-bold text-[#0B1A3E]">{analytics.uniqueVisitors.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-[#5A6A8C] mb-1">Most Viewed</div>
                <div className="text-lg font-bold text-[#0B1A3E] truncate">
                  {analytics.deviceViews[0]?.deviceName || 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#5A6A8C] mb-1">Requests This Month</div>
                <div className="text-2xl font-bold text-[#0B1A3E]">
                  {analytics.requestsByMonth[analytics.requestsByMonth.length - 1]?.count || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
