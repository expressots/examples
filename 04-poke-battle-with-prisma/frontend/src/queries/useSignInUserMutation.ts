import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../service/signInUser";

const useSignInUserMutation = () => {
  return useMutation({
    mutationFn: (body: any) => signInUser(body),
  });
};

export default useSignInUserMutation;
