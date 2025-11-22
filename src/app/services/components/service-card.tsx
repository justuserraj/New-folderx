import type { Service } from '@/lib/types';
import * as icons from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = icons[service.icon] as icons.LucideIcon;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 h-full flex flex-col">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
              <Icon className="h-8 w-8" />
            </div>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-primary/10 text-primary rounded-full">
              <Icon className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl">{service.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base text-foreground/80">
            {service.longDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button asChild className="group w-full">
            <Link href="/contact">
              Request this Service
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
