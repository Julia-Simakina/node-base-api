import config from "../config";
import * as jwt from "jsonwebtoken";

const tokenConfig = config.token;

const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, tokenConfig.keys.access, {
    expiresIn: tokenConfig.expirationTime.access,
  });
};
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, tokenConfig.keys.refresh, {
    expiresIn: tokenConfig.expirationTime.refresh,
  });
};
const generateTokenPair = (id: number) => {
  if (!id) {
    throw new Error("Token generation error");
  }
  return {
    accessToken: generateAccessToken(id),
    refreshToken: generateRefreshToken(id),
  };
};

export default generateTokenPair;
