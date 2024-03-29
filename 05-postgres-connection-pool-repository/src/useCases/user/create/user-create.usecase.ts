import { AppError, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { UserRepository } from "@repositories/user/user.repository";
import { CreateUserRequestDTO, CreateUserResponseDTO } from "./user-create.dto";
import { User } from "@entities/user.entity";

@provide(CreateUserUseCase)
export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private user: User,
        private report: Report,
    ) {}

    async execute(
        payload: CreateUserRequestDTO,
    ): Promise<CreateUserResponseDTO | AppError> {
        try {
            this.user.name = payload.name;
            this.user.email = payload.email;

            const userExists: User | null =
                await this.userRepository.findByEmail(this.user.email);

            if (userExists) {
                const error = this.report.error(
                    "User already exists",
                    StatusCode.BadRequest,
                    "create-user-usecase",
                );

                return error;
            }

            await this.userRepository.create(this.user);

            return {
                id: this.user.id,
                name: this.user.name,
                email: this.user.email,
                message: "user created successfully",
            };
        } catch (error: any) {
            throw error;
        }
    }
}
