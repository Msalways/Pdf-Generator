import { userSignup } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";

const useSignupMutation = async () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      name: string;
    }) => userSignup(payload),
  });
};

export default useSignupMutation;
