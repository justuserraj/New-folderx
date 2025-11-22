import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import AuthForm from './components/auth-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in or create an account to access Vizo Studio.',
};

export default function AuthPage() {
  return (
    <div className="container flex items-center justify-center min-h-[70vh] py-12 animate-fade-in">
       <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline">Client Portal</Badge>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">
            Sign in or create an account to view your projects.
          </p>
        </div>
        <AuthForm />
       </div>
    </div>
  );
}
