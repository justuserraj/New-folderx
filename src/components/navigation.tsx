"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, LogOut, LayoutGrid, Shield } from 'lucide-react';
import React, { useMemo } from 'react';

import { VizoLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { Skeleton } from './ui/skeleton';
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';

const baseNavLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const clientNavLink = { href: '/work', label: 'Work', icon: LayoutGrid };
const adminNavLink = { href: '/admin', label: 'Admin', icon: Shield };

interface UserProfile {
  firstName: string;
  lastName: string;
  isClient: boolean;
  isAdmin: boolean;
  email: string;
}

export default function Navigation() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const navLinks = useMemo(() => {
    let links = [...baseNavLinks];
    if (userProfile?.isClient) {
      links.splice(2, 0, clientNavLink);
    }
    if (userProfile?.isAdmin) {
      links.push(adminNavLink);
    }
    return links;
  }, [userProfile]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  const renderAuthButton = () => {
    if (isUserLoading || (user && isProfileLoading)) {
      return <Skeleton className="h-10 w-24" />;
    }

    if (user && userProfile) {
      const displayName = userProfile.firstName || user.email?.split('@')[0] || 'User';
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${user.uid}.png`} alt={displayName} />
                <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userProfile.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {userProfile.isClient && (
                    <DropdownMenuItem asChild>
                        <Link href="/work">
                           <LayoutGrid className="mr-2 h-4 w-4" />
                           <span>My Work</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                 {userProfile.isAdmin && (
                    <DropdownMenuItem asChild>
                        <Link href="/admin">
                           <Shield className="mr-2 h-4 w-4" />
                           <span>Admin Panel</span>
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button asChild>
        <Link href="/auth">
          <User className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold sm:inline-block font-headline text-lg">
            Vizo Studio
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:block">{renderAuthButton()}</div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                     <SheetClose asChild>
                      <Link href="/" className="flex items-center space-x-2">
                        <VizoLogo className="h-6 w-6 text-primary" />
                        <span className="font-bold">Vizo Studio</span>
                      </Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 py-4">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          'text-lg transition-colors hover:text-foreground/80',
                           pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t">
                   <SheetClose asChild>
                    {renderAuthButton()}
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
