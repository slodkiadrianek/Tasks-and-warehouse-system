// Class for custom error handling
export class AppError extends Error {
  public readonly name: string = "AppError";
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  constructor(
    name: string,
    statusCode: number,
    message: string,
    isOperational: boolean,
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
