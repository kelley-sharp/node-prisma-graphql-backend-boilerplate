export enum ApiErrorType {
  UNHANDLED,
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
  BAD_REQUEST,
  CONFLICT,
  FOREIGN_KEY_CONSTRAINT,
}

export class ApiError extends Error {
  type: ApiErrorType;

  constructor({ type, message }: { message?: string; type: ApiErrorType }) {
    super(message);
    this.type = type;
  }
}
