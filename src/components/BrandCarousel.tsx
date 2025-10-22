import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const brands = [
  { name: 'Caterpillar', logo: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761148501355_24b4dd09.webp' },
  { name: 'Komatsu', logo: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761148502071_bfc21fd7.webp' },
  { name: 'JCB', logo: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761148502795_81dfa466.webp' },
  { name: 'Bobcat', logo: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761148503459_a14191f3.webp' },
  { name: 'Volvo', logo: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761148504166_c7ff14ce.webp' },
  { name: 'Hitachi', logo: 'https://d64gsuwffb70l.cloudfront.net/68f8f5423675ec545a18fd37_1761148505058_a47beb93.webp' },
];

export const BrandCarousel: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
          Trusted Brands We Work With
        </h3>
        <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
          <CarouselContent className="-ml-4">
            {brands.map((brand, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <div className="flex items-center justify-center h-24 bg-white rounded-lg p-4 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src={brand.logo} alt={brand.name} className="max-h-16 max-w-full object-contain" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
