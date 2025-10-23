export interface Machine {
  id: number;
  name: string;
  category: string;
  image: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  description: string;
  specifications: string[];
  featured?: boolean;
}

export interface Machinery {
  id: number;
  name: string;
  category: string;
  image: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  description: string;
  specifications: string[];
  featured?: boolean;
}

export interface BookingRequest {
  id: string;
  machineId: number;
  machineName: string;
  customerName: string;
  company?: string;
  phone: string;
  email: string;
  jobSite: string;
  startDate: string;
  endDate: string;
  deliveryOption: 'delivery' | 'pickup';
  extras: string[];
  notes?: string;
  status: 'pending' | 'approved' | 'declined';
  totalCost: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}