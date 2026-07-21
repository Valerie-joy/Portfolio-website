import React from 'react';
import {
  useGetDashboardStats,
  useGetDashboardActivity
} from '@/hooks/useDashboard';
import { FolderKanban, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'wouter';

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useGetDashboardActivity();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Valerie. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Projects" 
          value={stats?.totalProjects.toString() || "0"} 
          icon={<FolderKanban className="h-5 w-5 text-primary" />} 
          loading={statsLoading} 
        />
        <StatCard 
          title="Messages" 
          value={stats?.totalMessages.toString() || "0"} 
          icon={<MessageSquare className="h-5 w-5 text-primary" />} 
          loading={statsLoading} 
        />
        <StatCard 
          title="Testimonials" 
          value={stats?.totalTestimonials.toString() || "0"} 
          icon={<Star className="h-5 w-5 text-primary" />} 
          loading={statsLoading} 
        />
        <StatCard
          title="Unread Messages"
          value={stats?.unreadMessages.toString() || "0"}
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
          loading={statsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass-panel border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted animate-pulse w-1/3 rounded" />
                      <div className="h-3 bg-muted animate-pulse w-1/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activities && activities.length > 0 ? (
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {activity.type === 'message' ? <MessageSquare className="h-4 w-4" /> :
                         activity.type === 'testimonial' ? <Star className="h-4 w-4" /> :
                         <FolderKanban className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No recent activity to show.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions & Status */}
        <div className="space-y-8">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/admin/projects">
                  Add New Project <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/admin/skills">
                  Edit Experience <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/admin/skills">
                  Add Testimonial <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-white">Site Status</h3>
                <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded border border-emerald-500/30">
                  Live
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Your portfolio is currently public and accepting messages.
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Published Projects</span>
                  <span className="text-primary font-medium">
                    {stats?.publishedProjects ?? 0} / {stats?.totalProjects ?? 0}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{
                      width: stats && stats.totalProjects > 0
                        ? `${Math.round((stats.publishedProjects / stats.totalProjects) * 100)}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, loading }: { title: string, value: string, icon: React.ReactNode, loading: boolean }) {
  return (
    <Card className="glass-panel border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-md">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-16 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
