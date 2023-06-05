import { useMutation } from "@tanstack/react-query";
import { createUser } from "../service/createUser";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../routes";
import { useAuthActions } from "../store";
import { TCreateRequest } from "../service/types";
import { mountAuthRoute } from "../utils/mountAuthRoute";

const useCreateUserMutation = () => {
  const navigation = useNavigate();
  const { setToken, setUser } = useAuthActions();

  return useMutation({
    mutationFn: (body: TCreateRequest) => createUser(body),
    onSuccess: (res) => {
      setUser({
        email: res.email,
        id: res.id,
        name: res.name,
				avatar: res.avatar,
      });
      setToken(res.token);
      navigation(mountAuthRoute(ROUTE.home));
    },
  });
};

export default useCreateUserMutation;
