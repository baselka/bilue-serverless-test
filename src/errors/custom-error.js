import logger from "../utils/logger.js";

export default class CustomError extends Error {

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 400
    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this);
    logger.error(message)
  }
  serializeErrors() { return [{ message: this.message, field: this.field }];}
  
}
