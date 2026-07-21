import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface DashboardStats {
  totalProjects: number;
  totalMessages: number;
  totalTestimonials: number;
  publishedProjects: number;
  draftProjects: number;
  unreadMessages: number;
}

export interface ActivityItem {
  id: number;
  type: 'message' | 'testimonial' | 'project';
  title: string;
  description: string;
  timestamp: string;
}

async function count(table: string, filter?: (q: any) => any) {
  let query = supabase.from(table).select('*', { count: 'exact', head: true });
  if (filter) query = filter(query);
  const { count: total, error } = await query;
  if (error) throw error;
  return total ?? 0;
}

export function useGetDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const [totalProjects, totalMessages, totalTestimonials, publishedProjects, draftProjects, unreadMessages] =
        await Promise.all([
          count('projects'),
          count('messages'),
          count('testimonials'),
          count('projects', (q) => q.eq('status', 'published')),
          count('projects', (q) => q.eq('status', 'draft')),
          count('messages', (q) => q.eq('read', false)),
        ]);

      return {
        totalProjects,
        totalMessages,
        totalTestimonials,
        publishedProjects,
        draftProjects,
        unreadMessages,
      };
    },
  });
}

export function useGetDashboardActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: async (): Promise<ActivityItem[]> => {
      const [{ data: messages, error: messagesError }, { data: testimonials, error: testimonialsError }, { data: projects, error: projectsError }] =
        await Promise.all([
          supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(3),
          supabase.from('testimonials').select('*').order('created_at', { ascending: false }).limit(2),
          supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(2),
        ]);

      if (messagesError) throw messagesError;
      if (testimonialsError) throw testimonialsError;
      if (projectsError) throw projectsError;

      const activity: ActivityItem[] = [
        ...(messages ?? []).map((m) => ({
          id: m.id,
          type: 'message' as const,
          title: m.name,
          description: m.message.slice(0, 100) + (m.message.length > 100 ? '...' : ''),
          timestamp: m.created_at,
        })),
        ...(testimonials ?? []).map((t) => ({
          id: t.id + 1000,
          type: 'testimonial' as const,
          title: t.author,
          description: `${t.rating}-star testimonial from ${t.company}. ${t.content.slice(0, 80)}...`,
          timestamp: t.created_at,
        })),
        ...(projects ?? []).map((p) => ({
          id: p.id + 2000,
          type: 'project' as const,
          title: p.title,
          description: `Project ${p.status}: ${p.description.slice(0, 80)}${p.description.length > 80 ? '...' : ''}`,
          timestamp: p.created_at,
        })),
      ];

      activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      return activity.slice(0, 6);
    },
  });
}
