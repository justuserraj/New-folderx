import Link from 'next/link';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center gap-8 text-center md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-4 md:items-start md:text-left">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-10 w-10" />
              <span className="text-xl font-bold font-headline">Vizo Studio</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building the future of digital experiences, one pixel at a time.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vizo Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
