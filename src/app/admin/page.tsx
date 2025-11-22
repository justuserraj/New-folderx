'use client';

import { useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminDashboard from './components/admin-dashboard';

interface UserProfile {
  isAdmin?: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [isUserLoading, user, router]);

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!userProfile?.isAdmin) {
    return (
      <div className="container py-16 md:py-24 text-center">
         <Card className="max-w-md mx-auto bg-destructive/10 border-destructive">
          <CardHeader className="flex-row items-center gap-4">
             <ShieldX className="w-8 h-8 text-destructive" />
             <div className="space-y-1 text-left">
                <CardTitle className="text-destructive">Access Denied</CardTitle>
                <CardDescription className="text-destructive/80">You do not have permission to view this page.</CardDescription>
             </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <Badge variant="outline">Admin Panel</Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Client Management
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Add and manage work items for your clients.
          </p>
        </div>
      </div>
      <AdminDashboard />
    </div>
  );
}
