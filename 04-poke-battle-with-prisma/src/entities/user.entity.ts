import { IUserAvatarDTO } from "@repositories/user/user.dto";
import { randomUUID } from "crypto";
import { provide } from "inversify-binding-decorators";

@provide(User)
class User {
  private _id: string;
  private _password: string;
  public name: string;
  public email: string;
  public avatar: IUserAvatarDTO;

  constructor(
    name: string,
    email: string,
    password: string,
    avatar: IUserAvatarDTO,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this._password = password;
    this.avatar = avatar;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }
}

export { User };
