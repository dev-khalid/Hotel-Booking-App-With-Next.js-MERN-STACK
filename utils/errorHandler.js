class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = sttusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
