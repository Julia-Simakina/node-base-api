import { ValidationErrorType } from "../types/types";

interface ICustomError extends Error {}

export default class CustomError implements ICustomError {
  status: number;
  name: string;
  errors?: ValidationErrorType[];
  message: string;

  constructor(status: number, message: string, errors?: ValidationErrorType[]) {
    this.message = message;
    this.status = status;
    this.errors = errors;

    this.name = "custom error";
  }
  static AuthError(message: string): CustomError {
    return new CustomError(401, message);
  }

  static BadRequestError(
    message: string,
    errors: ValidationErrorType[]
  ): CustomError {
    return new CustomError(400, message, errors);
  }

  static ForbiddenError(message: string): CustomError {
    return new CustomError(403, message);
  }

  static ConflictError(message: string): CustomError {
    return new CustomError(409, message);
  }

  static NotFoundError(message: string): CustomError {
    return new CustomError(404, message);
  }
}
