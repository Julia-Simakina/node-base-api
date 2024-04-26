interface NotFoundError extends Error {
  statusCode?: number;
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
