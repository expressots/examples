import { BaseController, StatusCode } from "@expressots/core";
import { Response } from "express";
import { UserUpdateRequestDTO, UserUpdateResponseDTO } from "./user-update.dto";
import { UserUpdateUseCase } from "./user-update.usecase";
import {
    Patch,
    body,
    controller,
    param,
    response,
} from "@expressots/adapter-express";

@controller("/user/update")
export class UserUpdateController extends BaseController {
    constructor(private userUpdateUseCase: UserUpdateUseCase) {
        super();
    }

    @Patch("/:email")
    async execute(
        @param("email") email: string,
        @body() payload: UserUpdateRequestDTO,
        @response() res: Response,
    ): Promise<UserUpdateResponseDTO> {
        const data = { ...payload, email };

        return this.callUseCase(
            await this.userUpdateUseCase.execute(data),
            res,
            StatusCode.OK,
        );
    }
}
