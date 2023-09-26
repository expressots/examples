import { IUserAvatarDTO } from "@repositories/user/user.dto";

interface ICreateUserDTO {
  name: string;
  email: string;
  avatar: IUserAvatarDTO;
  password: string;
}

interface ICreateUserResponseDTO {
  name: string;
  email: string;
  token: string;
  status: string;
  avatar: IUserAvatarDTO;
  id: string;
}

export { ICreateUserDTO, ICreateUserResponseDTO };
