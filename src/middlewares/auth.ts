import * as jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new Error("Требуется авторизация"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload: string | jwt.JwtPayload;

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    next(new Error("Требуется авторизация"));
  }

  req.user = payload;

  return next();
};

export default verify;
