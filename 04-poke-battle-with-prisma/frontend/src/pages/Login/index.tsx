import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateUserMutation from "../../queries/useCreateUserMutation";
import useSignInUserMutation from "../../queries/useSignInUserMutation";
import { ROUTE } from "../../routes";
import { Button, InlineLoading, Input, Sidebar } from "../../components";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { TCreateRequest } from "../../service/types";

type TLoginTabs = "login" | "create";

const Login = () => {
  const [tab, setTab] = useState<TLoginTabs>("login");
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

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries()) as TCreateRequest;

    actionRef.current === "create"
      ? createUser(formJson)
      : signInUser(formJson);
  }

  return (
    <div className="bg-[url('assets/florest.jpg')] bg-cover bg-center min-h-screen ">
      <Sidebar className="flex flex-col items-center justify-between">
        <div className="flex flex-col gap-5 items-center justify-start w-full">
          <div className="bg-[url('assets/pokeballred.png')] shadow-md bg-cover bg-center h-20 w-full rounded-md"></div>
          <div className="flex justify-start items-center w-full">
            <div className="tabs">
              <button
                onClick={() => setTab("login")}
                className={twMerge(
                  "tab tab-bordered",
                  tab === "login" && "tab-active",
                )}
              >
                Login
              </button>
              <button
                onClick={() => setTab("create")}
                className={twMerge(
                  "tab tab-bordered",
                  tab === "create" && "tab-active",
                )}
              >
                Create
              </button>
            </div>
          </div>
          <form
            className="w-full max-w-md flex flex-col gap-2 items-start justify-center"
            onSubmit={handleFormSubmit}
          >
            <div className="gap-7 flex flex-col w-full pt-10">
              {tab === "create" && (
                <Input
                  name="name"
                  classLabel="font-semibold"
                  type="text"
                  label="Name"
                />
              )}
              <Input
                name="email"
                classLabel="font-semibold"
                type="text"
                label="Email"
              />
              <Input
                classLabel="font-semibold"
                name="password"
                type="password"
                label="Password"
              />
            </div>
            <div className="min-h-12 flex items-center justify-center">
              <div className="flex flex-col items-start justify-start gap-2">
                {axios.isAxiosError(signInUserError) && (
                  <p className="text-error">
                    {signInUserError.response?.data?.error}
                  </p>
                )}
              </div>
              <InlineLoading
                isLoading={signInUserLoading}
                text="Carregando..."
              />
            </div>
            <div className="flex w-full">
              {tab === "create" ? (
                <Button
                  className="w-full"
                  onClick={() => (actionRef.current = "create")}
                  name="action1"
                  disabled={createUserLoading || signInUserLoading}
                  value="create"
                  type="submit"
                >
                  Criar
                </Button>
              ) : (
                <Button
                  onClick={() => (actionRef.current = "signin")}
                  name="action1"
                  className="w-full"
                  value="login"
                  disabled={createUserLoading || signInUserLoading}
                  type="submit"
                >
                  Login
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="font-thin flex justify-center items-start w-full ">
          <p>
            This app made with{" "}
            <a
              href="https://github.com/expressots/expressots"
              target="_blank"
              className="border-b-2 border-b-primary"
            >
              ExpressoTS
            </a>
          </p>
        </div>
      </Sidebar>
    </div>
  );
};

export default Login;
