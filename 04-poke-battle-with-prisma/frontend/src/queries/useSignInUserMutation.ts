import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../service/signInUser";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../store";
import { ROUTE } from "../routes";
import { mountAuthRoute } from "../utils/mountAuthRoute";

const useSignInUserMutation = () => {
  const navigation = useNavigate();
  const { setUser, setToken } = useAuthActions();

  return useMutation({
    mutationFn: (body: any) => signInUser(body),
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

export default useSignInUserMutation;
