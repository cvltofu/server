export default class ApiError extends Error {
  status: number;

  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'The user is not logged in.');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}
