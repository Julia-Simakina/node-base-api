import CustomError from "../errors/CustomError";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Unexpected error" });
};

export default errorHandler;
