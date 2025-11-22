import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight
} from 'lucide-react';
import * as icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const serviceHighlights = [
  {
    icon: 'Palette',
    title: 'Branding & Design',
    description: 'Crafting unique visual identities that tell your story.',
  },
  {
    icon: 'Code',
    title: 'Web Development',
    description: 'Building responsive, high-performance websites.',
  },
  {
    icon: 'Smartphone',
    title: 'App Development',
    description: 'Creating intuitive mobile experiences for iOS and Android.',
  },
  {
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'Driving growth and engagement through strategic campaigns.',
  },
];

const homeHeroImage = PlaceHolderImages.find(p => p.id === 'home-hero');
const featuredPortfolio = portfolioItems.slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        {homeHeroImage && (
          <Image
            src={homeHeroImage.imageUrl}
            alt={homeHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={homeHeroImage.imageHint}
          />
        )}
        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              We Build Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              Vizo Studio is a full-service agency delivering stunning
              branding, web design, and marketing solutions that drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/portfolio">
                  View Our Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline">Our Services</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What We Offer
              </h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
                From concept to launch, we provide a complete suite of creative
                and technical services to bring your vision to life.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4 mt-12">
            {serviceHighlights.map((service) => {
              const Icon = icons[service.icon as keyof typeof icons] as icons.LucideIcon;
              return (
              <div key={service.title} className="grid gap-1 text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="text-sm text-foreground/70">
                  {service.description}
                </p>
              </div>
            )})}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link href="/services">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge>Featured Work</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Creative Portfolio
              </h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
                Check out some of our recent projects that showcase our passion for
                creativity and innovation.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {featuredPortfolio.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
              >
                <Link href="/portfolio" className="block">
                  <div className="aspect-video relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      data-ai-hint={item.imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="group">
              <Link href="/portfolio">
                View Full Portfolio
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
