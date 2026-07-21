import { useMutation, useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type ProjectStatus = 'published' | 'draft' | 'archived';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  techStack: string[];
  imageUrl?: string | null;
  featured: boolean;
  liveUrl?: string | null;
  githubUrl?: string | null;
  createdAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectRow {
  id: number;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  tech_stack: string[];
  image_url: string | null;
  featured: boolean;
  live_url: string | null;
  github_url: string | null;
  created_at: string;
}

function mapRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    status: row.status,
    techStack: row.tech_stack,
    imageUrl: row.image_url,
    featured: row.featured,
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    createdAt: row.created_at,
  };
}

function toRow(input: ProjectInput) {
  return {
    title: input.title,
    description: input.description,
    category: input.category,
    status: input.status,
    tech_stack: input.techStack,
    image_url: input.imageUrl ?? null,
    live_url: input.liveUrl ?? null,
    github_url: input.githubUrl ?? null,
    featured: input.featured,
  };
}

export function getListProjectsQueryKey(): QueryKey {
  return ['projects'];
}

export function useListProjects() {
  return useQuery({
    queryKey: getListProjectsQueryKey(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as ProjectRow[]).map(mapRow);
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: ProjectInput }) => {
      const { data: row, error } = await supabase
        .from('projects')
        .insert(toRow(data))
        .select()
        .single();
      if (error) throw error;
      return mapRow(row as ProjectRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProjectInput }) => {
      const { data: row, error } = await supabase
        .from('projects')
        .update(toRow(data))
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return mapRow(row as ProjectRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
    },
  });
}
