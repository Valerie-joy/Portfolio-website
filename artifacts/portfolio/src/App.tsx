import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation, Redirect } from 'wouter';

import Home from '@/pages/public/Home';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Projects from '@/pages/admin/Projects';
import Skills from '@/pages/admin/Skills';
import Messages from '@/pages/admin/Messages';
import Settings from '@/pages/admin/Settings';
import Login from '@/pages/admin/Login';
import NotFound from '@/pages/not-found';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function AdminRouter() {
  const [location, setLocation] = useLocation();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (location === '/admin') {
      setLocation('/admin/dashboard');
    }
  }, [location, setLocation]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!session) {
    return <Redirect to="/admin/login" />;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/projects" component={Projects} />
        <Route path="/admin/skills" component={Skills} />
        <Route path="/admin/messages" component={Messages} />
        <Route path="/admin/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin" component={AdminRouter} />
      <Route path="/admin/:rest*" component={AdminRouter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
