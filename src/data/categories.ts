export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: 'heavy-machinery',
    name: 'Heavy Machinery',
    description: 'Excavators, Bobcats, and heavy construction equipment',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150923773_41274a7c.webp',
    count: 3,
  },
  {
    id: 'vibratory',
    name: 'Vibratory',
    description: 'Vibratory plates and compaction equipment',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150924596_5b13e45b.webp',
    count: 4,
  },
  {
    id: 'trench-roller',
    name: 'Trench Roller',
    description: 'Trenchers and trench compaction equipment',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150925426_e4664ad1.webp',
    count: 2,
  },
  {
    id: 'garden-tractors',
    name: 'Garden Tractors',
    description: 'Lawn tractors and landscaping equipment',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150926292_b3f0a44a.webp',
    count: 2,
  },
  {
    id: 'chainsaw',
    name: 'Chainsaw',
    description: 'Professional chainsaws for forestry and cutting',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150927051_d3d0a248.webp',
    count: 2,
  },
  {
    id: 'heavy-duty-trailer',
    name: 'Heavy duty Trailer',
    description: 'Box trailers for transporting equipment and materials',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150927859_63ad5eca.webp',
    count: 2,
  },
  {
    id: 'wheel-dumper',
    name: 'Wheel Dumper',
    description: 'Compact dumpers for material transport',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150928645_efc2a5a4.webp',
    count: 1,
  },
  {
    id: 'auger',
    name: 'Auger',
    description: 'Drilling equipment for various applications',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150929409_8ccd959c.webp',
    count: 1,
  },
  {
    id: 'sweeper',
    name: 'Sweeper',
    description: 'Industrial floor cleaning equipment',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761150930211_438c9e71.webp',
    count: 1,
  },
];
