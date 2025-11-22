import { useState, useEffect } from 'react';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const API_BASE = 'http://localhost:5000/api';

export function useWorkItems() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/workItems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setWorkItems(data);
      } else {
        setError('Failed to fetch work items');
      }
    } catch (err) {
      setError('Failed to fetch work items');
    } finally {
      setLoading(false);
    }
  };

  const addWorkItem = async (title: string, description: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/workItems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        await fetchWorkItems(); // Refresh list
      } else {
        setError('Failed to add work item');
      }
    } catch (err) {
      setError('Failed to add work item');
    }
  };

  const updateWorkItem = async (id: string, updates: Partial<WorkItem>) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/workItems/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        await fetchWorkItems(); // Refresh list
      } else {
        setError('Failed to update work item');
      }
    } catch (err) {
      setError('Failed to update work item');
    }
  };

  const deleteWorkItem = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/workItems/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchWorkItems(); // Refresh list
      } else {
        setError('Failed to delete work item');
      }
    } catch (err) {
      setError('Failed to delete work item');
    }
  };

  useEffect(() => {
    fetchWorkItems();
  }, []);

  return {
    workItems,
    loading,
    error,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem,
    refetch: fetchWorkItems,
  };
}
