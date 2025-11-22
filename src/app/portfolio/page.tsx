import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { portfolioItems } from '@/lib/data';
import PortfolioGrid from './components/portfolio-grid';

export const metadata: Metadata = {
  title: 'Our Portfolio',
  description: 'Browse a selection of our finest work in branding, development, and marketing.',
};

export default function PortfolioPage() {
  const categories = ['All', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <Badge variant="outline">Our Work</Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Creative Portfolio
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A showcase of our passion, creativity, and commitment to excellence.
          </p>
        </div>
      </div>
      <PortfolioGrid allItems={portfolioItems} categories={categories} />
    </div>
  );
}
