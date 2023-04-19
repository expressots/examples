import ENV from "env";
import jwt from "jsonwebtoken";

export function decodeToken(token) {
    return jwt.verify(token, ENV.Application.JWT_KEY);
}
