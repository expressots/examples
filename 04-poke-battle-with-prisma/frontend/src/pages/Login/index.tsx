import { FormEvent, useEffect, useRef, useState } from "react";
import expressoTSIcon from "../../assets/expressoicon.svg";
import useCreateUserMutation from "../../queries/useCreateUserMutation";
import useSignInUserMutation from "../../queries/useSignInUserMutation";
import { Button, InlineLoading, Input, ThemeSelector } from "../../components";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { IUserAvatar, TCreateRequest } from "../../service/types";
import CustomAvatar from "../../components/Molecules/CustomAvatar";
import { CubeIcon } from "@heroicons/react/24/outline";
import { defaultAvatarEnum } from "../../utils/enums";
import { useUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { mountAuthRoute } from "../../utils/mountAuthRoute";
import { ROUTE } from "../../routes";

type TLoginTabs = "login" | "create";

const defaultAvatar: IUserAvatar = {
  ...defaultAvatarEnum,
  earringsProbability: defaultAvatarEnum.earringsProbability,
  featuresProbability: defaultAvatarEnum.featuresProbability,
  glassesProbability: defaultAvatarEnum.glassesProbability,
  hairProbability: defaultAvatarEnum.hairProbability,
  flip: !!defaultAvatarEnum.flip,
};

const Login = () => {
  const navigation = useNavigate();

  const user = useUser();
  const [tab, setTab] = useState<TLoginTabs>("login");
  const [avatar, setAvatar] = useState<IUserAvatar>(defaultAvatar);
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

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (actionRef.current === "create") {
      const body = formJson as unknown as TCreateRequest;
      return createUser({ ...body, avatar });
    }

    return signInUser(formJson);
  }

  useEffect(() => {
    if (user) {
      navigation(mountAuthRoute(ROUTE.home));
    }
  }, []);

  return (
    <div className="max-w-4xl container py-10 px-4 m-auto flex flex-col gap-5 items-start justify-center min-h-screen w-full">
      <h1 className="text-xl font-semibold flex items-center justify-center gap-2">
        <CubeIcon className="h-8 w-8 text-primary" /> PokeBattle
      </h1>
      <div className="flex flex-col w-full gap-5 py-6 px-4 bg-base-100 border-4 border-base-300 border-b-[20px] rounded-md shadow-lg">
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
        {tab === "create" && (
          <div className="animate-fadeIn w-full flex items-start justify-start">
            <CustomAvatar setConstructAvatar={setAvatar} />
          </div>
        )}
        <form
          className="w-full max-w-full md:max-w-lg"
          onSubmit={handleFormSubmit}
        >
          <div className=" gap-7 flex flex-col w-full pt-10">
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
              classLabel="font-semibold w-full"
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
              {axios.isAxiosError(createUserError) && (
                <p className="text-error">
                  {createUserError.response?.data?.error}
                </p>
              )}
            </div>
            <InlineLoading isLoading={signInUserLoading} text="Carregando..." />
          </div>
          <div className="flex w-full">
            {tab === "create" ? (
              <Button
                className="w-full font-bold"
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
                className="w-full font-bold"
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
      <div className="flex justify-between w-full">
        <p className="flex gap-2 items-center justify-center bg-zinc-900 text-white p-1 rounded-md border-4 border-b-8 border-zinc-950">
          Made with{" "}
          <a
            href="https://github.com/expressots/expressots"
            target="_blank"
            className="flex items-center justify-center font-semibold text-green-400"
            rel="noreferrer"
          >
            ExpressoTS
            <img className="h-6 w-6" src={expressoTSIcon} alt="" />
          </a>
        </p>
        <ThemeSelector />
      </div>
    </div>
  );
};

export default Login;
