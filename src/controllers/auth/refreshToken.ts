import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import generateTokenPair from "../../utils/generateToken";
import "dotenv/config";
import CustomError from "../../errors/CustomError";
import { JwtPayloadType } from "../../types/types";

const { REFRESH_KEY } = process.env;

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = verify(
      req.body.refreshToken,
      REFRESH_KEY
    ) as JwtPayloadType;

    if (!decoded) {
      return next(CustomError.AuthError("Invalid refresh token"));
    }

    const tokens = generateTokenPair(Number(decoded.id));

    return res.status(200).json(tokens);
  } catch (error) {
    return console.error(error);
  }
};

export default refreshToken;
