import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Send, Check, ArrowLeft } from 'lucide-react';
import { programs } from '@/data/store';
import type { Device, DeviceProgram, DeviceRequest } from '@/types';

interface RequestFormSectionProps {
  device?: Device;
  onSubmit: (request: Omit<DeviceRequest, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function RequestFormSection({ device, onSubmit, onCancel }: RequestFormSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email' as 'email' | 'phone',
    programType: (device?.program || 'demo') as DeviceProgram,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    gsap.fromTo(
      form,
      { y: 60, scale: 0.98, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.preferredContact === 'phone' && !formData.phone.trim()) {
      newErrors.phone = 'Phone is required when preferred contact is phone';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      deviceId: device?.id || '',
      deviceName: device?.name || 'General Inquiry',
      ...formData,
      status: 'pending',
    });

    setIsSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <section ref={sectionRef} className="section-padding bg-[#F3F6FB] min-h-screen flex items-center">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold text-[#0B1A3E] mb-4">Request submitted!</h2>
          <p className="text-lg text-[#5A6A8C] mb-8">
            Thank you for your request. We usually respond within 1–2 business days.
          </p>
          <button onClick={onCancel} className="btn-primary">
            Back to devices
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section-padding bg-[#F3F6FB] min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onCancel}
          className="inline-flex items-center text-[#5A6A8C] hover:text-[#0B1A3E] mb-6 focus-ring rounded-lg px-3 py-2 -ml-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          Back
        </button>

        {/* Form Card */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bento-card bg-white p-8 lg:p-10 opacity-0"
          aria-labelledby="request-form-title"
        >
          <h1 id="request-form-title" className="text-2xl lg:text-3xl font-bold text-[#0B1A3E] mb-2">
            Request a device
          </h1>
          <p className="text-[#5A6A8C] mb-8">
            {device ? `Requesting: ${device.name}` : 'Fill out the form below to request a device.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="form-label">
                Full Name <span aria-label="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Your full name"
                aria-required="true"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">
                Email <span aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
                aria-required="true"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="(555) 123-4567"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Preferred Contact */}
            <div>
              <label htmlFor="preferredContact" className="form-label">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                value={formData.preferredContact}
                onChange={(e) => handleChange('preferredContact', e.target.value)}
                className="form-input"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            {/* Program Type */}
            <div>
              <label htmlFor="programType" className="form-label">
                Program Type
              </label>
              <select
                id="programType"
                value={formData.programType}
                onChange={(e) => handleChange('programType', e.target.value as DeviceProgram)}
                className="form-input"
                disabled={!!device}
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="form-label">
                Message (Optional)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="form-input min-h-[120px] resize-none"
                placeholder="Tell us about your needs or any questions you have..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" aria-hidden="true" />
              Submit request
            </button>
            <p className="text-sm text-[#5A6A8C]">
              We usually respond within 1–2 business days.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
