import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";

const generateJwt = (id: number, email: string) => {
  return jwt.sign({ id, email }, "random_secret_key", { expiresIn: "24h" });
};

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { fullName, email, password, dob } = req.body;

      const user = new User();
      user.fullName = fullName;
      user.email = email;
      user.password = password;
      user.dob = dob;

      await AppDataSource.manager.save(user);
      return res.status(201).send(user);
    } catch (error) {
      console.error("Error during registration:", error);
      return res
        .status(500)
        .json({ error: "An error occurred during registration" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user: User = await AppDataSource.manager.findOne(User, {
        where: {
          email: email,
          password: password,
        },
      });
      const token = generateJwt(user.id, user.email);
      return res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "An error occurred during login" });
    }
  }
  // async check(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const token = generateJwt(req.user.id, req.user.email)
  //     return res.json({token})
  //   } catch (error) {
  //     console.error("Error during check:", error);
  //   }
  // }
}
export default new UserController();
