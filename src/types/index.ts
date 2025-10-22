export interface Machine {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  specs: { [key: string]: string };
  rates: {
    day: number;
    weekend: number;
    week: number;
  };
  trailerIncluded: boolean;
  featured?: boolean;
}

export interface BookingRequest {
  id: string;
  machineId: string;
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
  image: string;
  count: number;
}
