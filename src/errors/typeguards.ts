import { ApiError } from "src/errors/api_error";

export function isApiError(error: Error): error is ApiError {
  return "type" in error;
}

export function assertNonNullish(
  thing: any,
  msgOrError: string | Error = "Assertion `assertNonNullish` Failed",
): asserts thing {
  if (thing === null || thing === undefined) {
    if (typeof msgOrError === "string") {
      throw new Error(msgOrError);
    } else {
      throw msgOrError;
    }
  }
}
