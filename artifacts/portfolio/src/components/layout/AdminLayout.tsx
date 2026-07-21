import React from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, FolderKanban, Wrench, MessageSquare, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills & Experience', icon: Wrench },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: SettingsIcon },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r border-border bg-sidebar flex flex-col justify-between">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-8">
            <Avatar className="h-10 w-10 border border-primary/20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src="/headshot.png" />
              <AvatarFallback>VI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm tracking-tight text-sidebar-foreground">Valerie Joy Intong</h3>
              <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 space-y-3">
          <div className="glass-panel p-4 rounded-lg flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">LIVE STATUS</p>
              <p className="text-[10px] text-muted-foreground">Editing content</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
