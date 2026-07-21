import { useMutation, useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Testimonial {
  id: number;
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface TestimonialInput {
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

interface TestimonialRow {
  id: number;
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar_url: string | null;
  created_at: string;
}

function mapRow(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    author: row.author,
    company: row.company,
    role: row.role,
    content: row.content,
    rating: row.rating,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
  };
}

function toRow(input: TestimonialInput) {
  return {
    author: input.author,
    company: input.company,
    role: input.role,
    content: input.content,
    rating: input.rating,
    avatar_url: input.avatarUrl ?? null,
  };
}

export function getListTestimonialsQueryKey(): QueryKey {
  return ['testimonials'];
}

export function useListTestimonials() {
  return useQuery({
    queryKey: getListTestimonialsQueryKey(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as TestimonialRow[]).map(mapRow);
    },
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: TestimonialInput }) => {
      const { data: row, error } = await supabase
        .from('testimonials')
        .insert(toRow(data))
        .select()
        .single();
      if (error) throw error;
      return mapRow(row as TestimonialRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TestimonialInput }) => {
      const { data: row, error } = await supabase
        .from('testimonials')
        .update(toRow(data))
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return mapRow(row as TestimonialRow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
    },
  });
}
