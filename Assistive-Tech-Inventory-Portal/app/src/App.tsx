import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import AdminLogin from '@/components/AdminLogin';
import HeroSection from '@/sections/HeroSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import CategoriesSection from '@/sections/CategoriesSection';
import BrowseDevicesSection from '@/sections/BrowseDevicesSection';
import DeviceDetailSection from '@/sections/DeviceDetailSection';
import RequestFormSection from '@/sections/RequestFormSection';
import AdminDashboardSection from '@/sections/AdminDashboardSection';
import AdminDeviceManager from '@/sections/AdminDeviceManager';
import AdminRequestsSection from '@/sections/AdminRequestsSection';
import AccessibilitySection from '@/sections/AccessibilitySection';
import FooterSection from '@/sections/FooterSection';
import {
  initializeData,
  saveData,
  trackVisit,
  isAdminLoggedIn,
  setAdminLoggedIn,
} from '@/data/store';
import type { Device, DeviceRequest, Analytics, DeviceCategory, DeviceFilters } from '@/types';

gsap.registerPlugin(ScrollTrigger);

type ViewState =
  | 'home'
  | 'device-detail'
  | 'request-form'
  | 'admin-dashboard'
  | 'admin-devices'
  | 'admin-requests';

function App() {
  // Data state
  const [devices, setDevices] = useState<Device[]>([]);
  const [requests, setRequests] = useState<DeviceRequest[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: [],
    deviceViews: [],
    requestsByMonth: [],
  });

  // View state
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<DeviceCategory | undefined>();

  // Admin state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize data
  useEffect(() => {
    const data = initializeData();
    setDevices(data.devices);
    setRequests(data.requests);
    setAnalytics(data.analytics);

    // Track visit
    trackVisit();

    // Check admin status
    setIsAdmin(isAdminLoggedIn());

    // Refresh ScrollTrigger after content loads
    ScrollTrigger.refresh();
  }, []);

  // Save data when changed
  useEffect(() => {
    if (devices.length > 0) {
      saveData(devices, requests, analytics);
    }
  }, [devices, requests, analytics]);

  // Handle device selection
  const handleDeviceSelect = useCallback((device: Device) => {
    setSelectedDevice(device);
    setCurrentView('device-detail');

    // Update analytics
    setAnalytics((prev) => ({
      ...prev,
      deviceViews: prev.deviceViews.map((dv) =>
        dv.deviceId === device.id ? { ...dv, views: dv.views + 1 } : dv
      ),
    }));
  }, []);

  // Handle request submission
  const handleRequestSubmit = useCallback(
    (requestData: Omit<DeviceRequest, 'id' | 'createdAt'>) => {
      const newRequest: DeviceRequest = {
        ...requestData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setRequests((prev) => [newRequest, ...prev]);
    },
    []
  );

  // Handle category selection
  const handleCategorySelect = useCallback((category: DeviceCategory) => {
    setCategoryFilter(category);
    const element = document.getElementById('browse-devices');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Admin login
  const handleAdminLogin = useCallback((username: string, password: string): boolean => {
    // Simple demo authentication
    if (username === 'admin' && password === 'password') {
      setIsAdmin(true);
      setAdminLoggedIn(true);
      setIsLoginOpen(false);
      setCurrentView('admin-dashboard');
      return true;
    }
    return false;
  }, []);

  // Admin logout
  const handleAdminLogout = useCallback(() => {
    setIsAdmin(false);
    setAdminLoggedIn(false);
    setCurrentView('home');
  }, []);

  // Device CRUD operations
  const handleAddDevice = useCallback((deviceData: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDevice: Device = {
      ...deviceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDevices((prev) => [newDevice, ...prev]);
  }, []);

  const handleUpdateDevice = useCallback((updatedDevice: Device) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === updatedDevice.id ? updatedDevice : d))
    );
  }, []);

  const handleDeleteDevice = useCallback((id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // Request update
  const handleUpdateRequest = useCallback((updatedRequest: DeviceRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r))
    );
  }, []);

  // Navigation handlers
  const handleAdminClick = useCallback(() => {
    if (isAdmin) {
      setCurrentView('admin-dashboard');
    } else {
      setIsLoginOpen(true);
    }
  }, [isAdmin]);

  const handleRequestClick = useCallback(() => {
    setSelectedDevice(null);
    setCurrentView('request-form');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentView('home');
    setSelectedDevice(null);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setCurrentView('admin-dashboard');
  }, []);

  // Render current view
  const renderContent = () => {
    switch (currentView) {
      case 'device-detail':
        if (!selectedDevice) return null;
        return (
          <DeviceDetailSection
            device={selectedDevice}
            onBack={handleBackToHome}
            onRequest={(device) => {
              setSelectedDevice(device);
              setCurrentView('request-form');
            }}
          />
        );

      case 'request-form':
        return (
          <RequestFormSection
            device={selectedDevice || undefined}
            onSubmit={handleRequestSubmit}
            onCancel={handleBackToHome}
          />
        );

      case 'admin-dashboard':
        return (
          <AdminDashboardSection
            devices={devices}
            requests={requests}
            analytics={analytics}
            onAddDevice={() => setCurrentView('admin-devices')}
            onViewRequests={() => setCurrentView('admin-requests')}
            onViewDevices={() => setCurrentView('admin-devices')}
            onLogout={handleAdminLogout}
          />
        );

      case 'admin-devices':
        return (
          <AdminDeviceManager
            devices={devices}
            onAddDevice={handleAddDevice}
            onUpdateDevice={handleUpdateDevice}
            onDeleteDevice={handleDeleteDevice}
            onBack={handleBackToDashboard}
          />
        );

      case 'admin-requests':
        return (
          <AdminRequestsSection
            requests={requests}
            onUpdateRequest={handleUpdateRequest}
            onBack={handleBackToDashboard}
          />
        );

      case 'home':
      default:
        return (
          <main id="main-content">
            <HeroSection />
            <div id="how-it-works">
              <HowItWorksSection />
            </div>
            <div id="categories-section">
              <CategoriesSection onCategorySelect={handleCategorySelect} />
            </div>
            <BrowseDevicesSection
              devices={devices}
              onDeviceSelect={handleDeviceSelect}
              initialFilters={{ category: categoryFilter } as DeviceFilters}
            />
            <div id="accessibility-section">
              <AccessibilitySection />
            </div>
            <FooterSection onAdminClick={handleAdminClick} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB]">
      {/* Navigation - only show on home view */}
      {currentView === 'home' && (
        <Navigation onAdminClick={handleAdminClick} onRequestClick={handleRequestClick} />
      )}

      {/* Admin Login Modal */}
      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleAdminLogin} />

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

export default App;
