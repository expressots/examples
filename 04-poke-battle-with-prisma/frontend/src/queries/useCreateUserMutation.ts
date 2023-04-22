import { useMutation } from "@tanstack/react-query";
import { createUser } from "../service/createUser";

const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (body: any) => createUser(body),
  });
};

export default useCreateUserMutation;
