import { userLogin } from "@/api/AuthApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) =>
      await userLogin(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["validateSession"] }),
  });
};

export default useLoginMutation;
