import { useMutation, useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type SkillCategory = 'Design & Creative' | 'Video Editing' | 'Social Media & Web';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  description: string;
  proficiency: number;
}

export interface SkillInput {
  name: string;
  category: SkillCategory;
  description: string;
  proficiency: number;
}

export function getListSkillsQueryKey(): QueryKey {
  return ['skills'];
}

export function useListSkills() {
  return useQuery({
    queryKey: getListSkillsQueryKey(),
    queryFn: async () => {
      const { data, error } = await supabase.from('skills').select('*').order('id');
      if (error) throw error;
      return data as Skill[];
    },
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: SkillInput }) => {
      const { data: row, error } = await supabase.from('skills').insert(data).select().single();
      if (error) throw error;
      return row as Skill;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SkillInput }) => {
      const { data: row, error } = await supabase
        .from('skills')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return row as Skill;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
    },
  });
}
