"use client";

import { useState, useMemo } from 'react';
import type { PortfolioItem } from '@/lib/types';
import PortfolioCard from './portfolio-card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface PortfolioGridProps {
  allItems: PortfolioItem[];
  categories: string[];
}

const ITEMS_PER_PAGE_DESKTOP = 6;
const ITEMS_PER_PAGE_MOBILE = 4;

export default function PortfolioGrid({ allItems, categories }: PortfolioGridProps) {
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const filteredItems = useMemo(() => {
    const items = activeCategory === 'All'
      ? allItems
      : allItems.filter(item => item.category === activeCategory);
    
    setVisibleCount(itemsPerPage);
    
    return items;
  }, [activeCategory, allItems, itemsPerPage]);

  const currentItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const canLoadMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'secondary'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map(item => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setVisibleCount(prev => prev + itemsPerPage)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
