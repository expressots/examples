import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { ILoginUserDTO, ILoginUserResponseDTO } from "./login-user.dto";
import { UserRepository } from "@repositories/user/user.repository";

import { comparePasswords } from "@providers/helpers/comparePasswords";
import generateToken from "@providers/helpers/generateToken";

@provide(LoginUserUsecase)
class LoginUserUsecase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: ILoginUserDTO): Promise<ILoginUserResponseDTO | null> {
        const { email, password } = data;

        const findUser = await this.userRepository.findByEmail(email);

        if (!findUser) {
            Report.Error(
                new AppError(
                    StatusCode.Unauthorized,
                    "User not a found",
                    "login-user-usecase",
                ),
            );

            return null;
        }

        let response: ILoginUserResponseDTO;

        const validPassword = await comparePasswords(
            password,
            findUser.password,
        );

        if (!validPassword) {
            Report.Error(
                new AppError(
                    StatusCode.Unauthorized,
                    "Email or password are is incorrect",
                    "login-user-usecase",
                ),
            );

            return null;
        }

        const token = generateToken({
            email: findUser.email,
            name: findUser.name,
            id: findUser.id,
        });

        response = {
            token,
            name: findUser.name,
            email: findUser.email,
            status: "success",
        };

        return response;
    }
}

export { LoginUserUsecase };
