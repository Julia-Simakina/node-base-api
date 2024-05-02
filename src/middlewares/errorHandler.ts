import { ApiError } from "../errors/ApiError";

const errorHandler = (err, req, res, next) => {
  // console.log(">>>>>>>>>>", err.constructor.name);
  // console.log("errorHandler >>", err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: "Unexpected error" });
};

export { errorHandler };
