import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { generateAccessToken } from "./auth/loginUser";
import "dotenv/config";
import { ApiError } from "../errors/ApiError";

const { REFRESH_KEY } = process.env;

type JwtPayloadType = {
  id: string;
};

function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken: string = req.body.refreshToken;

    if (!refreshToken) {
      return next(ApiError.BadRequestError("Refresh token is required"));
    }

    const decoded = verify(refreshToken, REFRESH_KEY) as JwtPayloadType;

    if (!decoded) {
      return next(ApiError.AuthError("Invalid refresh token"));
    }

    const userId = decoded.id;
    const accessToken = generateAccessToken(Number(userId));

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred during token refresh" });
  }
}

export { refreshToken };
