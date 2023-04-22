import { requester } from "../api/requester";
import { ENDPOINT } from "../endpoints";

export const createUser = async (body: any): Promise<any> => {
  const { data } = await requester().post(ENDPOINT.createUser, body);

  return data;
};
