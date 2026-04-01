import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Filter,
} from 'lucide-react';
import { categories, programs } from '@/data/store';
import type { Device, DeviceCategory, DeviceProgram, DeviceStatus } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface AdminDeviceManagerProps {
  devices: Device[];
  onAddDevice: (device: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateDevice: (device: Device) => void;
  onDeleteDevice: (id: string) => void;
  onBack: () => void;
}

const emptyDevice: Omit<Device, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  description: '',
  category: 'vision',
  program: 'demo',
  status: 'available',
  cost: 0,
  donationReceived: 0,
  donationGiven: 0,
  specs: [],
  bestFor: [],
};

export default function AdminDeviceManager({
  devices,
  onAddDevice,
  onUpdateDevice,
  onDeleteDevice,
  onBack,
}: AdminDeviceManagerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<DeviceCategory | 'all'>('all');
  const [filterProgram, setFilterProgram] = useState<DeviceProgram | 'all'>('all');
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyDevice);

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch =
        !searchQuery ||
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || device.category === filterCategory;
      const matchesProgram = filterProgram === 'all' || device.program === filterProgram;
      return matchesSearch && matchesCategory && matchesProgram;
    });
  }, [devices, searchQuery, filterCategory, filterProgram]);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const table = tableRef.current;
    if (!toolbar || !table) return;

    const triggers: ScrollTrigger[] = [];

    const toolbarTrigger = ScrollTrigger.create({
      trigger: toolbar,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(toolbar, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
      },
      once: true,
    });
    triggers.push(toolbarTrigger);

    const tableTrigger = ScrollTrigger.create({
      trigger: table,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(table, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      },
      once: true,
    });
    triggers.push(tableTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    setFormData({
      name: device.name,
      description: device.description,
      category: device.category,
      program: device.program,
      status: device.status,
      cost: device.cost || 0,
      donationReceived: device.donationReceived || 0,
      donationGiven: device.donationGiven || 0,
      specs: device.specs ? [...device.specs] : [],
      bestFor: device.bestFor ? [...device.bestFor] : [],
      availabilityDate: device.availabilityDate,
    });
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingDevice(null);
    setFormData(emptyDevice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (editingDevice) {
      onUpdateDevice({ ...editingDevice, ...formData, updatedAt: new Date().toISOString() });
    } else {
      onAddDevice(formData);
    }
    setIsAdding(false);
    setEditingDevice(null);
    setFormData(emptyDevice);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingDevice(null);
    setFormData(emptyDevice);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this device?')) {
      onDeleteDevice(id);
    }
  };

  const addSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...(prev.specs || []), { label: '', value: '' }],
    }));
  };

  const updateSpec = (index: number, field: 'label' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs?.map((s, i) => (i === index ? { ...s, [field]: value } : s)) || [],
    }));
  };

  const removeSpec = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs?.filter((_, i) => i !== index) || [],
    }));
  };

  const getStatusStyle = (status: DeviceStatus) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'on-loan':
        return 'bg-blue-100 text-blue-700';
      case 'reserved':
        return 'bg-purple-100 text-purple-700';
      case 'maintenance':
        return 'bg-amber-100 text-amber-700';
    }
  };

  // Form View
  if (isAdding || editingDevice) {
    return (
      <section ref={sectionRef} className="section-padding bg-[#F3F6FB] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-[#5A6A8C] hover:text-[#0B1A3E] mb-6 focus-ring rounded-lg px-3 py-2 -ml-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
            Back to devices
          </button>

          <div className="bento-card bg-white p-8 lg:p-10">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1A3E] mb-8">
              {isAdding ? 'Add New Device' : 'Edit Device'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="form-label">Device Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  placeholder="Enter device name"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="form-input min-h-[100px]"
                  placeholder="Enter device description"
                />
              </div>

              {/* Category */}
              <div>
                <label className="form-label">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value as DeviceCategory }))
                  }
                  className="form-input"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Program */}
              <div>
                <label className="form-label">Program</label>
                <select
                  value={formData.program}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, program: e.target.value as DeviceProgram }))
                  }
                  className="form-input"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value as DeviceStatus }))
                  }
                  className="form-input"
                >
                  <option value="available">Available</option>
                  <option value="on-loan">On Loan</option>
                  <option value="reserved">Reserved</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {/* Cost */}
              <div>
                <label className="form-label">Cost ($)</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cost: parseInt(e.target.value) || 0 }))
                  }
                  className="form-input"
                  placeholder="0"
                />
              </div>

              {/* Donation Received */}
              <div>
                <label className="form-label">Donation Received ($)</label>
                <input
                  type="number"
                  value={formData.donationReceived}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      donationReceived: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="form-input"
                  placeholder="0"
                />
              </div>

              {/* Donation Given */}
              <div>
                <label className="form-label">Donation Given ($)</label>
                <input
                  type="number"
                  value={formData.donationGiven}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      donationGiven: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="form-input"
                  placeholder="0"
                />
              </div>

              {/* Specs */}
              <div className="md:col-span-2">
                <label className="form-label">Specifications</label>
                <div className="space-y-3">
                  {formData.specs?.map((spec, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => updateSpec(index, 'label', e.target.value)}
                        className="form-input flex-1"
                        placeholder="Label (e.g., Weight)"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        className="form-input flex-1"
                        placeholder="Value (e.g., 2 lbs)"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <X className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpec}
                    className="text-sm text-[#2E5BFF] font-medium hover:underline"
                  >
                    + Add specification
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button onClick={handleSave} className="btn-primary inline-flex items-center">
                <Save className="w-5 h-5 mr-2" aria-hidden="true" />
                Save Device
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // List View
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
          <button onClick={handleAdd} className="btn-primary inline-flex items-center self-start">
            <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
            Add Device
          </button>
        </div>

        {/* Toolbar */}
        <div ref={toolbarRef} className="flex flex-col lg:flex-row gap-4 mb-6 opacity-0">
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
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#5A6A8C]" aria-hidden="true" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as DeviceCategory | 'all')}
              className="form-input py-2.5 w-40"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value as DeviceProgram | 'all')}
              className="form-input py-2.5 w-36"
            >
              <option value="all">All Programs</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div ref={tableRef} className="bento-card bg-white overflow-hidden opacity-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Category</th>
                  <th>Program</th>
                  <th>Status</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => (
                  <tr key={device.id}>
                    <td>
                      <div className="font-semibold text-[#0B1A3E]">{device.name}</div>
                      <div className="text-sm text-[#5A6A8C] line-clamp-1">{device.description}</div>
                    </td>
                    <td>{categories.find((c) => c.id === device.category)?.name}</td>
                    <td>
                      <span className="capitalize">{device.program}</span>
                    </td>
                    <td>
                      <span className={`chip ${getStatusStyle(device.status)} capitalize`}>
                        {device.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>${device.cost || 0}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(device)}
                          className="p-2 text-[#2E5BFF] hover:bg-[#E8F0FF] rounded-lg transition-colors focus-ring"
                          aria-label={`Edit ${device.name}`}
                        >
                          <Edit2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleDelete(device.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus-ring"
                          aria-label={`Delete ${device.name}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDevices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5A6A8C]">No devices found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
