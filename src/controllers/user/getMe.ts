import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import generateTokenPair from "../../utils/generateToken";
import "dotenv/config";
import { JwtPayloadType } from "../../types/types";
import CustomError from "../../errors/CustomError";
import userRepository from "../../db/userRepository";
import User from "../../db/entity/User";

const { ACCESS_KEY } = process.env;

const getMe = async (req: Request, res: Response<User>, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.replace("Bearer ", "");
    const decodedToken = verify(token, ACCESS_KEY) as JwtPayloadType;

    const userId = Number(decodedToken.id);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    // (user as any).avatar =
    //   "http://localhost:3000/uploads/avatar-1716905518885.png";

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMe;
