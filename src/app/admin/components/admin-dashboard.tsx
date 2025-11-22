'use client';

import { useState, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import AddWorkItemForm from './add-work-item-form';

interface ClientProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AdminDashboard() {
  const firestore = useFirestore();
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);

  const clientsQuery = useMemoFirebase(() => {
    return query(collection(firestore, 'users'), where('isClient', '==', true));
  }, [firestore]);

  const { data: clients, isLoading: isLoadingClients } = useCollection<ClientProfile>(clientsQuery);

  const clientOptions = useMemo(() => {
    if (!clients) return [];
    return clients.map(c => ({
      value: c.id,
      label: `${c.firstName} ${c.lastName} (${c.email})`
    }));
  }, [clients]);

  const handleClientSelect = (clientId: string) => {
    const client = clients?.find(c => c.id === clientId) || null;
    setSelectedClient(client);
  };
  
  if (isLoadingClients) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Select a client to manage their work items.</CardDescription>
        </CardHeader>
        <CardContent>
          {clients && clients.length > 0 ? (
            <ul className="space-y-2">
              {clients.map(client => (
                <li key={client.id}>
                  <button
                    onClick={() => handleClientSelect(client.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${selectedClient?.id === client.id ? 'bg-primary/20' : 'hover:bg-secondary'}`}
                  >
                    <p className="font-medium">{client.firstName} {client.lastName}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center">No clients found.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Work Item</CardTitle>
           {selectedClient ? (
             <CardDescription>
                Adding a new project for <span className="font-semibold text-primary">{selectedClient.firstName} {selectedClient.lastName}</span>.
            </CardDescription>
           ) : (
            <CardDescription>Please select a client first.</CardDescription>
           )}
        </CardHeader>
        <CardContent>
          <AddWorkItemForm client={selectedClient} />
        </CardContent>
      </Card>
    </div>
  );
}
