interface AuthError extends Error {
  statusCode?: number;
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export default AuthError;
