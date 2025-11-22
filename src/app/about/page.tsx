import Image from 'next/image';
import type { Metadata } from 'next';
import { CheckCircle, Eye, Lightbulb, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the story, values, and team behind Vizo Studio.',
};

const values = [
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Innovation',
    description: 'We constantly push creative boundaries and embrace new technologies to deliver cutting-edge solutions.',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Collaboration',
    description: 'We believe the best results come from working closely with our clients and each other.',
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'Excellence',
    description: 'We are committed to the highest standards of quality in everything we do, from design to delivery.',
  },
  {
    icon: <Eye className="h-8 w-8" />,
    title: 'Transparency',
    description: 'We maintain open and honest communication with our clients throughout the entire project lifecycle.',
  },
];

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Creative Director',
    avatarId: 'team-member-1',
  },
  {
    name: 'John Smith',
    role: 'Lead Developer',
    avatarId: 'team-member-2',
  },
  {
    name: 'Emily White',
    role: 'Marketing Strategist',
    avatarId: 'team-member-3',
  },
];

const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-team');

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="container relative z-20 px-4 md:px-6">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Our Story
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            We are a team of passionate creators, thinkers, and innovators dedicated to building beautiful and effective digital experiences.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <Badge variant="outline">Who We Are</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The minds behind the magic.</h2>
              <p className="text-foreground/80">
                Vizo Studio was founded on the simple idea that great design and powerful technology can transform businesses. We started as a small group of freelancers and have grown into a full-service agency, but our core mission remains the same: to help our clients succeed in the digital world.
              </p>
              <p className="text-foreground/80">
                Our approach is collaborative and data-driven. We immerse ourselves in our clients' industries to understand their unique challenges and opportunities. This allows us to craft bespoke solutions that are not just aesthetically pleasing, but also strategically sound and geared for growth.
              </p>
            </div>
            <div className="space-y-8">
              {values.slice(0, 2).map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-full h-fit text-primary">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
         <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge>Our Core Values</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                The Principles That Guide Us
              </h2>
            </div>
          </div>
           <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4 mt-12">
            {values.map((value) => (
              <div key={value.title} className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-2">
                   <div className="p-3 bg-primary/10 rounded-full text-primary">{value.icon}</div>
                </div>
                <h3 className="text-lg font-bold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
               <Badge variant="outline">Our Team</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet the Experts</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our success is driven by our talented and dedicated team of professionals.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member) => {
               const avatarImage = PlaceHolderImages.find(p => p.id === member.avatarId);
               return (
                  <Card key={member.name} className="text-center">
                    <CardContent className="pt-6">
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={member.name} data-ai-hint={avatarImage.imageHint} />}
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-primary">{member.role}</p>
                    </CardContent>
                  </Card>
                );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
