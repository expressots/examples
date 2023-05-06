import { requester } from "../api/requester";
import { ENDPOINT } from "../endpoints";
import { TAuthResponse, TCreateRequest } from "./types";

export const createUser = async (
  body: TCreateRequest,
): Promise<TAuthResponse> => {
  const { data } = await requester().post<TAuthResponse>(
    ENDPOINT.createUser,
    body,
  );

  return data;
};
