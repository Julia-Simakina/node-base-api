import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { generateAccessToken } from "./auth";

type JwtPayload = {
  id: string;
};

function refreshToken(req: Request, res: Response) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const decoded = verify(refreshToken, "refresh_secret_key") as JwtPayload;

    if (decoded) {
      const userId = decoded.id;
      const accessToken = generateAccessToken(Number(userId));

      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred during token refresh" });
  }
}

export { refreshToken };
