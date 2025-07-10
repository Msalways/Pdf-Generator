import { validateUserSession } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export const useValidateSessionQuery = () => {
  return useQuery({
    queryKey: ["validateSession"],
    queryFn: async () => await validateUserSession(),
    retry: false,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    enabled: true,
  });
};
