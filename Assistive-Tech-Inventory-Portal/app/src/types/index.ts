// Device Program Types
export type DeviceProgram = 'demo' | 'loan' | 'reuse';

// Device Categories
export type DeviceCategory =
  | 'vision'
  | 'hearing'
  | 'speech-communication'
  | 'learning-cognition'
  | 'mobility-seating'
  | 'daily-living'
  | 'environmental'
  | 'computers'
  | 'recreational';

// Device Status
export type DeviceStatus = 'available' | 'on-loan' | 'reserved' | 'maintenance';

// Device Interface
export interface Device {
  id: string;
  name: string;
  description: string;
  category: DeviceCategory;
  program: DeviceProgram;
  status: DeviceStatus;
  image?: string;
  cost?: number;
  donationReceived?: number;
  donationGiven?: number;
  specs?: {
    label: string;
    value: string;
  }[];
  bestFor?: string[];
  availabilityDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Device Request
export interface DeviceRequest {
  id: string;
  deviceId: string;
  deviceName: string;
  name: string;
  email: string;
  phone?: string;
  preferredContact: 'email' | 'phone';
  programType: DeviceProgram;
  message?: string;
  status: 'pending' | 'approved' | 'denied' | 'completed';
  createdAt: string;
}

// Analytics Data
export interface Analytics {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: {
    page: string;
    views: number;
  }[];
  deviceViews: {
    deviceId: string;
    deviceName: string;
    views: number;
  }[];
  requestsByMonth: {
    month: string;
    count: number;
  }[];
}

// Category Info
export interface CategoryInfo {
  id: DeviceCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Program Info
export interface ProgramInfo {
  id: DeviceProgram;
  name: string;
  description: string;
  color: string;
  bgColor: string;
}

// Admin User
export interface AdminUser {
  id: string;
  username: string;
  isLoggedIn: boolean;
}

// Filter Options
export interface DeviceFilters {
  program?: DeviceProgram | 'all';
  category?: DeviceCategory | 'all';
  status?: DeviceStatus | 'all';
  search?: string;
}
