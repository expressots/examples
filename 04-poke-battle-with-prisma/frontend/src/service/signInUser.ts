import { requester } from "../api/requester";
import { ENDPOINT } from "../endpoints";
import { TAuthResponse, TLoginRequest } from "./types";

export const signInUser = async (
  body: TLoginRequest,
): Promise<TAuthResponse> => {
  const { data } = await requester().post<TAuthResponse>(
    ENDPOINT.signInUser,
    body,
  );

  return data;
};
