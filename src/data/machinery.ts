import { Machinery } from '../types';

export const machinery: Machinery[] = [
  {
    id: 1,
    name: "Vibratory Plate Compactor",
    category: "Vibratory",
    image: "https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761152081462_b8961e5f.webp",
    dailyRate: 45,
    weeklyRate: 180,
    monthlyRate: 600,
    description: "Heavy-duty plate compactor for soil and asphalt compaction",
    specifications: ["Engine: 5.5 HP", "Plate Size: 20\" x 24\"", "Weight: 220 lbs"]
  },
  {
    id: 2,
    name: "Mini Excavator",
    category: "Heavy Machinery",
    image: "https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761152082212_906552d0.webp",
    dailyRate: 250,
    weeklyRate: 1000,
    monthlyRate: 3500,
    description: "Compact excavator perfect for tight spaces",
    specifications: ["Weight: 3.5 tons", "Dig Depth: 10 ft", "Bucket Width: 24\""]
  },
  {
    id: 3,
    name: "Skid Steer Loader",
    category: "Heavy Machinery",
    image: "https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761152082929_215e57e0.webp",
    dailyRate: 200,
    weeklyRate: 800,
    monthlyRate: 2800,
    description: "Versatile compact loader for various applications",
    specifications: ["Operating Capacity: 1,800 lbs", "Engine: 74 HP", "Width: 68\""]
  },
  {
    id: 4,
    name: "Walk-Behind Sweeper",
    category: "Sweeper",
    image: "https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761152083690_120f9cfa.webp",
    dailyRate: 65,
    weeklyRate: 260,
    monthlyRate: 850,
    description: "Professional floor sweeper for indoor and outdoor use",
    specifications: ["Sweeping Width: 28\"", "Battery Powered", "Hopper: 8 gallons"]
  },
  {
    id: 5,
    name: "Rotary Cutter",
    category: "Garden Tractors",
    image: "https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761152084412_b54974a9.webp",
    dailyRate: 75,
    weeklyRate: 300,
    monthlyRate: 950,
    description: "Heavy-duty brush cutter for land clearing",
    specifications: ["Cutting Width: 60\"", "3-Point Hitch", "Blade Tip Speed: 15,000 FPM"]
  }
];
