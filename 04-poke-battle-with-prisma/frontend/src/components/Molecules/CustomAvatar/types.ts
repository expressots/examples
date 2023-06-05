import { Dispatch, SetStateAction } from "react";
import { IUserAvatar } from "../../../service/types";

export type TCustomAvatarProps = {
  seed?: string;
  setConstructAvatar: Dispatch<SetStateAction<IUserAvatar>>;
};
