import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Check, X, Mail, Phone, Filter, Calendar } from 'lucide-react';
import type { DeviceRequest, DeviceProgram } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface AdminRequestsSectionProps {
  requests: DeviceRequest[];
  onUpdateRequest: (request: DeviceRequest) => void;
  onBack: () => void;
}

export default function AdminRequestsSection({
  requests,
  onUpdateRequest,
  onBack,
}: AdminRequestsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'denied' | 'completed'>('all');
  const [filterProgram, setFilterProgram] = useState<DeviceProgram | 'all'>('all');

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
      const matchesProgram = filterProgram === 'all' || request.programType === filterProgram;
      return matchesStatus && matchesProgram;
    });
  }, [requests, filterStatus, filterProgram]);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const trigger = ScrollTrigger.create({
      trigger: table,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(table, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleStatusChange = (request: DeviceRequest, newStatus: DeviceRequest['status']) => {
    onUpdateRequest({ ...request, status: newStatus });
  };

  const getStatusStyle = (status: DeviceRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'denied':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-[#F3F6FB] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-[#5A6A8C] hover:text-[#0B1A3E] focus-ring rounded-lg px-3 py-2 -ml-3 self-start"
          >
            <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
            Back to dashboard
          </button>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1A3E] mb-2">Device Requests</h1>
        <p className="text-[#5A6A8C] mb-8">
          Manage and respond to device requests from the community.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#5A6A8C]" aria-hidden="true" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="form-input py-2.5 w-36"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value as DeviceProgram | 'all')}
            className="form-input py-2.5 w-36"
          >
            <option value="all">All Programs</option>
            <option value="demo">Demo</option>
            <option value="loan">Loan</option>
            <option value="reuse">Reuse</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bento-card bg-white p-4 text-center">
            <div className="text-2xl font-bold text-[#0B1A3E]">
              {requests.filter((r) => r.status === 'pending').length}
            </div>
            <div className="text-sm text-[#5A6A8C]">Pending</div>
          </div>
          <div className="bento-card bg-white p-4 text-center">
            <div className="text-2xl font-bold text-[#0B1A3E]">
              {requests.filter((r) => r.status === 'approved').length}
            </div>
            <div className="text-sm text-[#5A6A8C]">Approved</div>
          </div>
          <div className="bento-card bg-white p-4 text-center">
            <div className="text-2xl font-bold text-[#0B1A3E]">
              {requests.filter((r) => r.status === 'completed').length}
            </div>
            <div className="text-sm text-[#5A6A8C]">Completed</div>
          </div>
          <div className="bento-card bg-white p-4 text-center">
            <div className="text-2xl font-bold text-[#0B1A3E]">{requests.length}</div>
            <div className="text-sm text-[#5A6A8C]">Total</div>
          </div>
        </div>

        {/* Table */}
        <div ref={tableRef} className="bento-card bg-white overflow-hidden opacity-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Device</th>
                  <th>Program</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <div className="font-semibold text-[#0B1A3E]">{request.name}</div>
                      <div className="flex items-center gap-2 text-sm text-[#5A6A8C]">
                        <Mail className="w-3 h-3" aria-hidden="true" />
                        {request.email}
                        {request.phone && (
                          <>
                            <span className="mx-1">•</span>
                            <Phone className="w-3 h-3" aria-hidden="true" />
                            {request.phone}
                          </>
                        )}
                      </div>
                      <div className="text-xs text-[#5A6A8C] mt-1">
                        Preferred: {request.preferredContact}
                      </div>
                    </td>
                    <td>
                      <div className="font-medium text-[#0B1A3E]">{request.deviceName}</div>
                      {request.message && (
                        <div className="text-sm text-[#5A6A8C] line-clamp-2">{request.message}</div>
                      )}
                    </td>
                    <td>
                      <span className="capitalize">{request.programType}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-sm text-[#5A6A8C]">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className={`chip ${getStatusStyle(request.status)} capitalize`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(request, 'approved')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors focus-ring"
                              aria-label="Approve request"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(request, 'denied')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus-ring"
                              aria-label="Deny request"
                              title="Deny"
                            >
                              <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </>
                        )}
                        {request.status === 'approved' && (
                          <button
                            onClick={() => handleStatusChange(request, 'completed')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus-ring"
                            aria-label="Mark as completed"
                            title="Complete"
                          >
                            <Check className="w-4 h-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5A6A8C]">No requests found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
