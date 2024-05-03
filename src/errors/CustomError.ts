interface ICustomError extends Error {}

export default class CustomError implements ICustomError {
  status: number;
  name: string;
  message: string;

  constructor(status: number, message: string) {
    this.message = message;
    this.status = status;
    this.name = "custom error";
  }
  static AuthError(message: string): CustomError {
    return new CustomError(401, message);
  }
  static BadRequestError(message: string): CustomError {
    return new CustomError(400, message);
  }
  static ConflictError(message: string): CustomError {
    return new CustomError(409, message);
  }

  static NotFoundError(message: string): CustomError {
    return new CustomError(404, message);
  }
}
