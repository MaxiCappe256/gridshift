import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useRoutines() {
  return useQuery({
    queryKey: ['Routines'],
    queryFn: async () => {
      const res = await api.get('/routines');
      return res.data;
    },
  });
}
