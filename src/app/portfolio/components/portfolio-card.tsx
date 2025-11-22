import Image from 'next/image';
import type { PortfolioItem } from '@/lib/types';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={item.imageHint}
            />
          </div>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
             <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              data-ai-hint={item.imageHint}
            />
          </div>
          <Badge variant="secondary" className="w-fit">{item.category}</Badge>
          <DialogTitle className="text-3xl font-bold mt-2">{item.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-foreground/80 text-base">
          <p>{item.longDescription}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
