import { useMutation, useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type ExperienceType = 'Full-time' | 'Part-time' | 'Freelance' | 'Contract';

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  type: ExperienceType;
  description: string;
  featured: boolean;
  createdAt: string;
}

export interface ExperienceInput {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  type: ExperienceType;
  description: string;
  featured: boolean;
}

interface ExperienceRow {
  id: number;
  role: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  type: ExperienceType;
  description: string;
  featured: boolean;
  created_at: string;
}

function mapRow(row: ExperienceRow): Experience {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    location: row.location,
    startDate: row.start_date,
    endDate: row.end_date,
    type: row.type,
    description: row.description,
    featured: row.featured,
    createdAt: row.created_at,
  };
}

function toRow(input: ExperienceInput) {
  return {
    role: input.role,
    company: input.company,
    location: input.location,
    start_date: input.startDate,
    end_date: input.endDate ?? null,
    type: input.type,
    description: input.description,
    featured: input.featured,
  };
}

export function getListExperienceQueryKey(): QueryKey {
  return ['experience'];
}

export function useListExperience() {
  return useQuery({
    queryKey: getListExperienceQueryKey(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as ExperienceRow[]).map(mapRow);
    },
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: ExperienceInput }) => {
      const { data: row, error } = await supabase
        .from('experience')
        .insert(toRow(data))
        .select()
        .single();
      if (error) throw error;
      return mapRow(row as ExperienceRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListExperienceQueryKey() });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ExperienceInput }) => {
      const { data: row, error } = await supabase
        .from('experience')
        .update(toRow(data))
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return mapRow(row as ExperienceRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListExperienceQueryKey() });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListExperienceQueryKey() });
    },
  });
}
