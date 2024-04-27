import "dotenv/config";
const { ACCESS_KEY, REFRESH_KEY } = process.env;
import * as jwt from "jsonwebtoken";

const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, ACCESS_KEY, { expiresIn: "2m" });
};
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, REFRESH_KEY, { expiresIn: "5d" });
};

export { generateAccessToken, generateRefreshToken };
