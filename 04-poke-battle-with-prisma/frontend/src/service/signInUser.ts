import { requester } from "../api/requester";
import { ENDPOINT } from "../endpoints";

export const signInUser = async (body: any): Promise<any> => {
  const { data } = await requester().post(ENDPOINT.signInUser, body);

  return data;
};
