interface OurErr extends Error {}

export class ApiError implements OurErr {
  status: number;
  errors: any[];
  name: string;
  message: string;

  constructor(status: number, message: string) {
    // super(message);
    this.message = message;
    this.status = status;
    this.name = "custom name";

    // Object.setPrototypeOf(this, ApiError.prototype);
  }
  static AuthError(message: string): ApiError {
    return new ApiError(401, message);
  }
  static BadRequestError(message: string): ApiError {
    // console.log("BadRequest: ", message);
    return new ApiError(400, message);
  }
  static ConflictError(message: string): ApiError {
    return new ApiError(409, message);
  }

  static NotFoundError(message: string): ApiError {
    return new ApiError(404, message);
  }
}
