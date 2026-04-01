import type { Device, DeviceRequest, Analytics, CategoryInfo, ProgramInfo } from '@/types';

// Program Information
export const programs: ProgramInfo[] = [
  {
    id: 'demo',
    name: 'Demo',
    description: 'Try in-person at our center',
    color: '#10B981',
    bgColor: '#E6FAF5',
  },
  {
    id: 'loan',
    name: 'Loan',
    description: 'Borrow for 2–6 weeks',
    color: '#2E5BFF',
    bgColor: '#E8F0FF',
  },
  {
    id: 'reuse',
    name: 'Reuse',
    description: 'Gently used, donated to you',
    color: '#F59E0B',
    bgColor: '#FFF2E8',
  },
];

// Category Information
export const categories: CategoryInfo[] = [
  {
    id: 'vision',
    name: 'Vision',
    description: 'Devices for visual impairment support',
    icon: 'eye',
    color: '#8B5CF6',
  },
  {
    id: 'hearing',
    name: 'Hearing',
    description: 'Hearing aids and assistive listening devices',
    icon: 'ear',
    color: '#06B6D4',
  },
  {
    id: 'speech-communication',
    name: 'Speech & Communication',
    description: 'AAC devices and communication tools',
    icon: 'message-circle',
    color: '#EC4899',
  },
  {
    id: 'learning-cognition',
    name: 'Learning & Cognition',
    description: 'Tools for learning and cognitive support',
    icon: 'brain',
    color: '#F59E0B',
  },
  {
    id: 'mobility-seating',
    name: 'Mobility & Seating',
    description: 'Wheelchairs, walkers, and positioning aids',
    icon: 'wheelchair',
    color: '#10B981',
  },
  {
    id: 'daily-living',
    name: 'Daily Living',
    description: 'Aids for everyday activities',
    icon: 'hand-heart',
    color: '#EF4444',
  },
  {
    id: 'environmental',
    name: 'Environmental',
    description: 'Home and workplace adaptations',
    icon: 'home',
    color: '#6366F1',
  },
  {
    id: 'computers',
    name: 'Computers',
    description: 'Adaptive computer equipment',
    icon: 'laptop',
    color: '#14B8A6',
  },
  {
    id: 'recreational',
    name: 'Recreational',
    description: 'Sports and leisure equipment',
    icon: 'basketball',
    color: '#F97316',
  },
];

// Sample Devices
export const initialDevices: Device[] = [
  {
    id: '1',
    name: 'Digital Magnifier Pro',
    description: 'Portable electronic magnifier with 5-inch HD display, adjustable contrast modes, and LED lighting for reading small text.',
    category: 'vision',
    program: 'demo',
    status: 'available',
    image: '/images/devices/magnifier.jpg',
    cost: 450,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Screen Size', value: '5 inches' },
      { label: 'Magnification', value: '2x–32x' },
      { label: 'Battery', value: '4 hours' },
    ],
    bestFor: ['Low vision', 'Reading', 'Detail work'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z',
  },
  {
    id: '2',
    name: 'AAC Communication Tablet',
    description: 'Touchscreen communication device with pre-loaded symbol-based software for non-verbal individuals.',
    category: 'speech-communication',
    program: 'loan',
    status: 'on-loan',
    image: '/images/devices/aac-tablet.jpg',
    cost: 1200,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Screen', value: '10.1 inches' },
      { label: 'Software', value: 'SymbolStix' },
      { label: 'Speakers', value: 'Dual stereo' },
    ],
    bestFor: ['Non-verbal communication', 'Autism', 'Speech impairments'],
    availabilityDate: '2024-04-15',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-03-05T11:00:00Z',
  },
  {
    id: '3',
    name: 'Adaptive Keyboard',
    description: 'Large-key keyboard with high-contrast keys and customizable keyguard for improved typing accuracy.',
    category: 'computers',
    program: 'reuse',
    status: 'available',
    image: '/images/devices/keyboard.jpg',
    cost: 0,
    donationReceived: 85,
    donationGiven: 0,
    specs: [
      { label: 'Key Size', value: '1 inch square' },
      { label: 'Connection', value: 'USB/Wireless' },
      { label: 'Colors', value: 'Black/Yellow' },
    ],
    bestFor: ['Motor impairments', 'Low vision', 'Learning disabilities'],
    createdAt: '2024-02-01T13:00:00Z',
    updatedAt: '2024-03-02T10:00:00Z',
  },
  {
    id: '4',
    name: 'Bluetooth Hearing Amplifier',
    description: 'Rechargeable personal sound amplifier with Bluetooth connectivity for phone calls and media streaming.',
    category: 'hearing',
    program: 'demo',
    status: 'available',
    image: '/images/devices/hearing-aid.jpg',
    cost: 350,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Battery Life', value: '16 hours' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Modes', value: '4 presets' },
    ],
    bestFor: ['Hearing loss', 'Phone calls', 'TV listening'],
    createdAt: '2024-01-25T11:30:00Z',
    updatedAt: '2024-03-03T15:00:00Z',
  },
  {
    id: '5',
    name: 'Rollator Walker',
    description: 'Lightweight aluminum rollator with seat, backrest, and storage basket. Adjustable height.',
    category: 'mobility-seating',
    program: 'reuse',
    status: 'available',
    image: '/images/devices/rollator.jpg',
    cost: 0,
    donationReceived: 120,
    donationGiven: 0,
    specs: [
      { label: 'Weight', value: '15 lbs' },
      { label: 'Capacity', value: '300 lbs' },
      { label: 'Wheels', value: '8 inches' },
    ],
    bestFor: ['Mobility support', 'Balance issues', 'Fatigue'],
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-04T09:30:00Z',
  },
  {
    id: '6',
    name: 'Switch-Adapted Mouse',
    description: 'Computer mouse adapted for single-switch use, allowing click and drag operations with accessibility switches.',
    category: 'computers',
    program: 'loan',
    status: 'available',
    image: '/images/devices/switch-mouse.jpg',
    cost: 180,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Switches', value: '2 ports' },
      { label: 'Connection', value: 'USB' },
      { label: 'Compatibility', value: 'Windows/Mac' },
    ],
    bestFor: ['Motor impairments', 'Limited hand control'],
    createdAt: '2024-02-15T14:00:00Z',
    updatedAt: '2024-03-06T12:00:00Z',
  },
  {
    id: '7',
    name: 'Weighted Blanket',
    description: 'Calming weighted blanket with even weight distribution, removable washable cover.',
    category: 'learning-cognition',
    program: 'demo',
    status: 'maintenance',
    image: '/images/devices/blanket.jpg',
    cost: 95,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Weight', value: '12 lbs' },
      { label: 'Size', value: '48x72 inches' },
      { label: 'Material', value: 'Cotton/Glass beads' },
    ],
    bestFor: ['Anxiety', 'Autism', 'Sleep issues'],
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-03-07T10:30:00Z',
  },
  {
    id: '8',
    name: 'Voice Recorder Pen',
    description: 'Digital pen that records audio while you write, perfect for note-taking and memory support.',
    category: 'learning-cognition',
    program: 'loan',
    status: 'available',
    image: '/images/devices/recorder-pen.jpg',
    cost: 220,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Storage', value: '8GB' },
      { label: 'Battery', value: '12 hours' },
      { label: 'Format', value: 'MP3' },
    ],
    bestFor: ['Memory support', 'Learning disabilities', 'Meetings'],
    createdAt: '2024-02-25T11:00:00Z',
    updatedAt: '2024-03-08T14:00:00Z',
  },
  {
    id: '9',
    name: 'Shower Chair',
    description: 'Adjustable height shower chair with non-slip feet and drainage holes for safe bathing.',
    category: 'daily-living',
    program: 'reuse',
    status: 'available',
    image: '/images/devices/shower-chair.jpg',
    cost: 0,
    donationReceived: 65,
    donationGiven: 0,
    specs: [
      { label: 'Height', value: '14-21 inches' },
      { label: 'Capacity', value: '250 lbs' },
      { label: 'Material', value: 'Aluminum/Plastic' },
    ],
    bestFor: ['Balance issues', 'Fatigue', 'Safety'],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-08T16:00:00Z',
  },
  {
    id: '10',
    name: 'Smart Doorbell',
    description: 'Video doorbell with visual alerts and vibration notifications for deaf and hard of hearing users.',
    category: 'environmental',
    program: 'demo',
    status: 'available',
    image: '/images/devices/doorbell.jpg',
    cost: 199,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Camera', value: '1080p HD' },
      { label: 'Alerts', value: 'Visual/Vibration' },
      { label: 'Power', value: 'Battery/Hardwired' },
    ],
    bestFor: ['Hearing loss', 'Home safety'],
    createdAt: '2024-03-02T13:00:00Z',
    updatedAt: '2024-03-08T11:00:00Z',
  },
  {
    id: '11',
    name: 'Adaptive Sports Ball',
    description: 'Beeping ball for visually impaired sports, includes bells inside for auditory tracking.',
    category: 'recreational',
    program: 'loan',
    status: 'available',
    image: '/images/devices/sports-ball.jpg',
    cost: 45,
    donationReceived: 0,
    donationGiven: 0,
    specs: [
      { label: 'Size', value: 'Regulation' },
      { label: 'Sound', value: 'Continuous beep' },
      { label: 'Battery', value: 'Replaceable' },
    ],
    bestFor: ['Visual impairment', 'Team sports', 'Recreation'],
    createdAt: '2024-03-03T09:30:00Z',
    updatedAt: '2024-03-08T13:30:00Z',
  },
  {
    id: '12',
    name: 'Page Turner',
    description: 'Mechanical page turner for books and magazines, foot pedal operated.',
    category: 'daily-living',
    program: 'reuse',
    status: 'available',
    image: '/images/devices/page-turner.jpg',
    cost: 0,
    donationReceived: 150,
    donationGiven: 0,
    specs: [
      { label: 'Book Size', value: 'Up to 12x18 inches' },
      { label: 'Operation', value: 'Foot pedal' },
      { label: 'Power', value: 'AC adapter' },
    ],
    bestFor: ['Motor impairments', 'Limited hand use', 'Reading'],
    createdAt: '2024-03-04T14:30:00Z',
    updatedAt: '2024-03-08T15:00:00Z',
  },
];

// Sample Requests
export const initialRequests: DeviceRequest[] = [
  {
    id: '1',
    deviceId: '2',
    deviceName: 'AAC Communication Tablet',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '555-0123',
    preferredContact: 'email',
    programType: 'loan',
    message: 'Looking for a communication device for my son who has autism.',
    status: 'pending',
    createdAt: '2024-03-07T10:00:00Z',
  },
  {
    id: '2',
    deviceId: '5',
    deviceName: 'Rollator Walker',
    name: 'Robert Chen',
    email: 'rchen@email.com',
    phone: '555-0456',
    preferredContact: 'phone',
    programType: 'reuse',
    message: 'Need mobility support after knee surgery.',
    status: 'approved',
    createdAt: '2024-03-06T14:30:00Z',
  },
  {
    id: '3',
    deviceId: '1',
    deviceName: 'Digital Magnifier Pro',
    name: 'Mary Williams',
    email: 'mwilliams@email.com',
    preferredContact: 'email',
    programType: 'demo',
    message: 'Would like to try before purchasing.',
    status: 'completed',
    createdAt: '2024-03-05T09:00:00Z',
  },
];

// Sample Analytics
export const initialAnalytics: Analytics = {
  totalVisits: 1247,
  uniqueVisitors: 892,
  pageViews: [
    { page: 'Home', views: 1247 },
    { page: 'Browse Devices', views: 856 },
    { page: 'Device Details', views: 623 },
    { page: 'Categories', views: 445 },
    { page: 'Request Form', views: 234 },
  ],
  deviceViews: [
    { deviceId: '2', deviceName: 'AAC Communication Tablet', views: 156 },
    { deviceId: '1', deviceName: 'Digital Magnifier Pro', views: 134 },
    { deviceId: '5', deviceName: 'Rollator Walker', views: 98 },
    { deviceId: '4', deviceName: 'Bluetooth Hearing Amplifier', views: 87 },
    { deviceId: '6', deviceName: 'Switch-Adapted Mouse', views: 76 },
  ],
  requestsByMonth: [
    { month: 'Jan 2024', count: 12 },
    { month: 'Feb 2024', count: 18 },
    { month: 'Mar 2024', count: 24 },
  ],
};

// LocalStorage keys
const STORAGE_KEYS = {
  devices: 'atdm_devices',
  requests: 'atdm_requests',
  analytics: 'atdm_analytics',
  admin: 'atdm_admin',
  visits: 'atdm_visits',
};

// Initialize data from localStorage or use defaults
export function initializeData(): { devices: Device[]; requests: DeviceRequest[]; analytics: Analytics } {
  const storedDevices = localStorage.getItem(STORAGE_KEYS.devices);
  const storedRequests = localStorage.getItem(STORAGE_KEYS.requests);
  const storedAnalytics = localStorage.getItem(STORAGE_KEYS.analytics);

  return {
    devices: storedDevices ? JSON.parse(storedDevices) : [...initialDevices],
    requests: storedRequests ? JSON.parse(storedRequests) : [...initialRequests],
    analytics: storedAnalytics ? JSON.parse(storedAnalytics) : { ...initialAnalytics },
  };
}

// Save data to localStorage
export function saveData(devices: Device[], requests: DeviceRequest[], analytics: Analytics): void {
  localStorage.setItem(STORAGE_KEYS.devices, JSON.stringify(devices));
  localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
  localStorage.setItem(STORAGE_KEYS.analytics, JSON.stringify(analytics));
}

// Track visit
export function trackVisit(): void {
  const visits = parseInt(localStorage.getItem(STORAGE_KEYS.visits) || '0', 10);
  localStorage.setItem(STORAGE_KEYS.visits, (visits + 1).toString());
}

// Get visits count
export function getVisits(): number {
  return parseInt(localStorage.getItem(STORAGE_KEYS.visits) || '0', 10);
}

// Admin auth
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(STORAGE_KEYS.admin) === 'true';
}

export function setAdminLoggedIn(loggedIn: boolean): void {
  localStorage.setItem(STORAGE_KEYS.admin, loggedIn.toString());
}
