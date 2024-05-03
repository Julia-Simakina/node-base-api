import "dotenv/config";
import { access } from "fs";
const {
  ACCESS_KEY,
  REFRESH_KEY,
  TIME_EXPIRES_ACCESS_TOKEN,
  TIME_EXPIRES_REFRESH_TOKEN,
} = process.env;
import * as jwt from "jsonwebtoken";

const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, ACCESS_KEY, { expiresIn: TIME_EXPIRES_ACCESS_TOKEN });
};
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, REFRESH_KEY, {
    expiresIn: TIME_EXPIRES_REFRESH_TOKEN,
  });
};
const generateTokenPair = (id: number) => {
  return {
    accessToken: generateAccessToken(id),
    refreshToken: generateRefreshToken(id),
  };
};

export { generateAccessToken, generateRefreshToken, generateTokenPair };
