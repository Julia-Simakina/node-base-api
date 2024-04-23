import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import * as crypto from "crypto";

interface UserRequest extends Request {
  user: User;
}

const generateJwt = (id: number) => {
  return jwt.sign({ id }, "random_secret_key", { expiresIn: "5d" });
};

const hashPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { fullName, email, password, dob }: User = req.body;

      const hashedPassword = hashPassword(password);

      const user = new User();
      user.fullName = fullName;
      user.email = email;
      user.password = hashedPassword;
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

      const hashedPassword = hashPassword(password);

      const user: User = await AppDataSource.manager.findOne(User, {
        where: {
          email: email,
          password: hashedPassword,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateJwt(user.id);
      return res.status(200).send({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "An error occurred during login" });
    }
  }

  async getUserData(req: UserRequest, res: Response): Promise<Response> {
    try {
      const currentUser = req.params;

      console.log("currentUser>>>", currentUser);
      if (!currentUser) {
        return res.status(401).json({ error: "User not found" });
      }

      const user: User = await AppDataSource.manager.findOne(User, {
        where: { id: parseInt(currentUser.id) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error while edit params:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while editing the user" });
    }
  }
  async updateUserData(req: UserRequest, res: Response): Promise<Response> {
    try {
      const { fullName, email, dob } = req.body;
      // const currentUser = req.params;
      const userRepository = AppDataSource.getRepository(User);

      await userRepository.update(Number(req.params.id), {
        fullName,
        email,
        dob,
      });

      const updatedUser = await userRepository.findOne({
        where: { id: Number(req.params.id) },
      });

      res.send(updatedUser);
    } catch (error) {
      console.error("Error while fetching user:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching user" });
    }
  }

  async deleteUser(req: UserRequest, res: Response): Promise<Response> {
    try {
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: { id: Number(req.params.id) },
      });

      await userRepository.remove(user);

      res.send(`User id ${req.params.id} has been deleted.`);
    } catch (error) {
      console.error("Error while fetching user:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching user" });
    }
  }
}

export default new UserController();
