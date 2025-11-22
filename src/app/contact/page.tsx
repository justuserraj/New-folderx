import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ContactForm from './components/contact-form';
import { services } from '@/lib/data';
import { WhatsAppIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Vizo Studio to discuss your project or request a service.',
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export default function ContactPage() {
  const serviceOptions = services.map(s => s.title);

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <Badge variant="outline">Get in Touch</Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Let's Build Something Great
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind? Fill out the form below or reach out to us directly through one of the channels below.
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="order-2 lg:order-1">
          <ContactForm serviceOptions={serviceOptions} />
        </div>
        <div className="order-1 lg:order-2 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                We're available for a friendly chat. Let's talk about your project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contact@vizostudio.com" className="text-muted-foreground hover:text-foreground">
                  contact@vizostudio.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <WhatsAppIcon className="w-5 h-5 text-primary" />
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  +1 (555) 123-4567
                </a>
              </div>
            </CardContent>
           </Card>
           <Card>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
              <CardDescription>
                Stay up to date with our latest news and projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <Link href={social.href} aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
