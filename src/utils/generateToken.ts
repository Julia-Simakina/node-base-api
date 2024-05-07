import config from "../config";

import * as jwt from "jsonwebtoken";
import CustomError from "../errors/CustomError";

const tokenConfig = config.token;

const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, tokenConfig.keys.access, {
    expiresIn: tokenConfig.expirationTime.access,
  });
};
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, config.token.keys.refresh, {
    expiresIn: config.token.expirationTime.refresh,
  });
};
const generateTokenPair = (id: number) => {
  if (!id) {
    throw new Error("");
  }
  return {
    accessToken: generateAccessToken(id),
    refreshToken: generateRefreshToken(id),
  };
};

export default generateTokenPair;
