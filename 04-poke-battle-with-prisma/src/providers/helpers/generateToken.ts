import ENV from "env";
import jwt from "jsonwebtoken";

function generateToken(payload) {
  return jwt.sign(payload, ENV.Application.JWT_KEY, {
    expiresIn: 10800000, // expires in 3hours
  });
}

export default generateToken;
