import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { ICreateUserDTO, ICreateUserResponseDTO } from "./create-user.dto";
import { UserRepository } from "@repositories/user/user.repository";
import { User } from "@entities/user.entity";
import { IUserAvatarDTO, IUserDTO } from "@repositories/user/user.dto";
import { JWTProvider } from "@providers/encrypt/jwt/jwt.provider";
import { stringify } from "qs";

@provide(CreateUserUseCase)
class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtProvider: JWTProvider,
  ) {}

  getAvatarUrl = (avatar: Omit<IUserAvatarDTO, "url">) => {
    const AVATAR_BASE_URL = "https://api.dicebear.com/6.x/adventurer";
    const params = stringify(
      {
        ...avatar,
      },
      {
        encodeValuesOnly: true,
        arrayFormat: "brackets",
      },
    );

    return `${AVATAR_BASE_URL}/svg?seed=${encodeURIComponent(avatar.seed)}${
      params ? `&${params}` : null
    }`;
  };

  async execute(data: ICreateUserDTO): Promise<ICreateUserResponseDTO | null> {
    try {
      const { name, email, password, avatar } = data;

      const findUser = await this.userRepository.findByEmail(email);

      if (findUser) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "User already exists",
            "create-user-usecase",
          ),
        );
      }

      const avatarObject = { ...avatar, url: this.getAvatarUrl(avatar) };

      const user: IUserDTO = await this.userRepository.create(
        new User(name, email, password, avatarObject),
      );

      if (!user) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "Registry error",
            "create-user-usecase",
          ),
        );
      }

      let response: ICreateUserResponseDTO;

      if (user !== null) {
        const token = this.jwtProvider.generateToken({
          email: user.email,
          name: user.name,
          id: user.id,
        });

        response = {
          id: `${user.id}`,
          token,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          status: "success",
        };
        return response;
      }

      return null;
    } catch (error: any) {
      throw error;
    }
  }
}

export { CreateUserUseCase };
