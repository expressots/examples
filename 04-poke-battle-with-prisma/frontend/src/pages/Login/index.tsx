import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCreateUserMutation from "../../queries/useCreateUserMutation";
import useSignInUserMutation from "../../queries/useSignInUserMutation";
import { ROUTE } from "../../routes";
import { Button, InlineLoading, Input } from "../../components";
import axios from "axios";

const Login = () => {
  const navigation = useNavigate();

  const {
    mutate: createUser,
    isLoading: createUserLoading,
    error: createUserError,
  } = useCreateUserMutation();
  const {
    mutate: signInUser,
    isLoading: signInUserLoading,
    error: signInUserError,
  } = useSignInUserMutation();

  const actionRef = useRef("");

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    actionRef.current === "create"
      ? createUser(formJson, { onSuccess: () => navigation(ROUTE.home) })
      : signInUser(formJson, { onSuccess: () => navigation(ROUTE.home) });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container px-4 mx-auto">
      <form
        className="w-full max-w-md flex flex-col gap-2 items-start justify-center"
        onSubmit={handleLoginSubmit}
      >
        <Input name="name" type="text" placeholder="Your name" />
        <Input name="email" type="text" placeholder="Your email" />
        <Input name="password" type="password" placeholder="Password" />
        <div className="h-10 flex items-center justify-center">
          <div className="flex flex-col items-start justify-start gap-2">
            {axios.isAxiosError(createUserError) && (
              <p className="text-error">
                {createUserError.response?.data?.error}
              </p>
            )}
            {axios.isAxiosError(signInUserError) && (
              <p className="text-error">
                {signInUserError.response?.data?.error}
              </p>
            )}
          </div>
          <InlineLoading
            isLoading={signInUserLoading || createUserLoading}
            text="Carregando..."
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => (actionRef.current = "signin")}
            name="action1"
            value="login"
            disabled={createUserLoading || signInUserLoading}
            type="submit"
          >
            Login
          </Button>
          <Button
            onClick={() => (actionRef.current = "create")}
            id="btn-safado"
            name="action1"
            disabled={createUserLoading || signInUserLoading}
            value="create"
            type="submit"
          >
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
