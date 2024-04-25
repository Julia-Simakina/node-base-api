import * as jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.replace("Bearer ", "");
    // let payload: string | jwt.JwtPayload;

    const payload = jwt.verify(token, "random_secret_key");

    req.user = payload;

    return next();
  } catch (error) {
    console.log("ERRROROROROROR >>>", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token died" });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
};

export default authMiddleware;
