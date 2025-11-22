'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title is too short.' }),
  description: z.string().min(10, { message: 'Description is too short.' }),
  status: z.enum(['Pending', 'In Progress', 'Completed']),
  dueDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ClientProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AddWorkItemFormProps {
  client: ClientProfile | null;
}

export default function AddWorkItemForm({ client }: AddWorkItemFormProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'Pending',
      dueDate: '',
    },
  });

  async function onSubmit(values: FormValues) {
    if (!client) {
        toast({ variant: 'destructive', title: 'No client selected' });
        return;
    }

    setIsSubmitting(true);
    
    try {
        const workItemsRef = collection(firestore, `users/${client.id}/workItems`);
        
        await addDocumentNonBlocking(workItemsRef, {
            ...values,
            userProfileId: client.id,
            // Firestore will auto-generate the ID
        });
        
        toast({
            title: 'Work Item Added',
            description: `Successfully added "${values.title}" for ${client.firstName}.`,
        });
        form.reset();
    } catch (error) {
        console.error('Error adding document: ', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not add the work item.',
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New Website Design" {...field} disabled={!client} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Details about the project..." {...field} disabled={!client} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!client}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {['Pending', 'In Progress', 'Completed'].map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Due Date (Optional)</FormLabel>
                <FormControl>
                    <Input type="date" {...field} disabled={!client} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" disabled={!client || isSubmitting} className="w-full">
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Add Project'}
        </Button>
      </form>
    </Form>
  );
}
