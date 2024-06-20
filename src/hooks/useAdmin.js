import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
export function useAdmin() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: isAdmin,
    isPending,
    error,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/admin/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  return [isAdmin, error, isPending];
}
