'use client';

import { useMemo, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2, FolderKanban, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  dueDate?: string;
}

export default function WorkPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const workItemsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/workItems`);
  }, [firestore, user]);

  const { data: workItems, isLoading, error } = useCollection<WorkItem>(workItemsQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <Badge variant="outline">Client Portal</Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Your Work
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Here's a summary of all your projects and their current status.
          </p>
        </div>
      </div>
      
      {error && (
        <Card className="max-w-xl mx-auto bg-destructive/10 border-destructive">
          <CardHeader className="flex-row items-center gap-4">
             <AlertTriangle className="w-8 h-8 text-destructive" />
             <div className="space-y-1">
                <CardTitle className="text-destructive">Access Denied</CardTitle>
                <CardDescription className="text-destructive/80">You do not have permission to view this content.</CardDescription>
             </div>
          </CardHeader>
        </Card>
      )}

      {!error && workItems && workItems.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge variant={
                    item.status === 'Completed' ? 'default' : 
                    item.status === 'In Progress' ? 'secondary' : 'outline'
                  }>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                {item.dueDate && (
                  <p className="text-sm text-foreground/70">
                    <strong>Due:</strong> {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!error && !isLoading && workItems?.length === 0 && (
        <Card className="max-w-xl mx-auto text-center">
            <CardHeader>
                <div className="flex justify-center mb-2">
                    <FolderKanban className="w-16 h-16 text-muted-foreground" />
                </div>
                <CardTitle>No Work Items Yet</CardTitle>
                <CardDescription>
                    Once we start a project together, you'll find all the details right here.
                </CardDescription>
            </CardHeader>
        </Card>
      )}

    </div>
  );
}
