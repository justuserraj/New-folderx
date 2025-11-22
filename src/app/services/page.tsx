import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { services } from '@/lib/data';
import ServicesList from './components/services-list';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the full range of creative and technical services offered by Vizo Studio.',
};

export default function ServicesPage() {
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <Badge variant="outline">What We Do</Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Our Services
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We provide a comprehensive suite of services to build, launch, and grow your digital presence.
          </p>
        </div>
      </div>
      <ServicesList services={services} categories={categories} />
    </div>
  );
}
