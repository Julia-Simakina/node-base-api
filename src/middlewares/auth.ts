import * as jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization is required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload: string | jwt.JwtPayload;

  try {
    payload = jwt.verify(token, "random_secret_key");
  } catch (error) {
    return res.status(401).json({ error: "Authorization is required" });
  }

  req.user = payload;

  return next();
};

export default authMiddleware;
