import { useMutation, useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Message {
  id: number;
  name: string;
  email: string;
  projectType?: string | null;
  budget?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ContactInput {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
}

interface MessageRow {
  id: number;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

function mapRow(row: MessageRow): Message {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    projectType: row.project_type,
    budget: row.budget,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  };
}

export function getListMessagesQueryKey(): QueryKey {
  return ['messages'];
}

export function useListMessages() {
  return useQuery({
    queryKey: getListMessagesQueryKey(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as MessageRow[]).map(mapRow);
    },
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async ({ data }: { data: ContactInput }) => {
      const { error } = await supabase.from('messages').insert({
        name: data.name,
        email: data.email,
        project_type: data.projectType ?? null,
        budget: data.budget ?? null,
        message: data.message,
      });
      if (error) throw error;
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey() });
    },
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, read }: { id: number; read: boolean }) => {
      const { error } = await supabase.from('messages').update({ read }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey() });
    },
  });
}
