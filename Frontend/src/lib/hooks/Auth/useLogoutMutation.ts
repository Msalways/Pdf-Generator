import { userLogout } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => userLogout(),
  });
};

export default useLogoutMutation;
