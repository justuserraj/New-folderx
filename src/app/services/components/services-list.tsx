"use client";

import { useState, useMemo } from 'react';
import type { Service } from '@/lib/types';
import ServiceCard from './service-card';
import { Button } from '@/components/ui/button';

interface ServicesListProps {
  services: Service[];
  categories: string[];
}

export default function ServicesList({ services, categories }: ServicesListProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') {
      return services;
    }
    return services.filter(service => service.category === activeCategory);
  }, [activeCategory, services]);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'secondary'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
