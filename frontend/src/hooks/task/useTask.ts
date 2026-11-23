import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTasksByUser } from "@/utils/api/taskService";

/**
 * Hook to prefetch tasks
 * Useful for preloading data before it's needed
 * @param perPage
 */

export const usePrefetchTasks = (user_id: string | undefined) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: ["tasks", user_id],
      queryFn: () =>
        fetchAllTasksByUser({
          user_id: user_id, // Replace with actual user ID or parameter as needed
        }),
      staleTime: 5 * 60 * 1000,
    });
  };
};

/**
 * Fetches all tasks for a specific user using React Query.
 * @param user_id - The ID of the user for whom to fetch tasks.
 * @param currentPage - The current page number for pagination (optional).
 * @param perPage - The number of tasks per page for pagination (optional).
 * @returns A React Query object containing the tasks data and query status.
 */

export const useAllTasks = (user_id: string | undefined) => {
  return useQuery({
    queryFn: () =>
      fetchAllTasksByUser({
        user_id: user_id,
      }),
    queryKey: ["tasks", user_id],
    // enabled: isAuthenticated, // Only fetch when authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (res) => res ?? [], // Return empty array if no data
  });
};
