import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "src/errors/api_error";
import { isApiError } from "src/errors/typeguards";
import { SchemaContext } from "src/shared/shared_types";
// import { ZodError } from "zod";

type CatchResolverErrorConfig<Context extends SchemaContext> = {
  entity: Prisma.ModelName | "Record";
  context: Context;
};

export function catchResolverError<Context extends SchemaContext>(
  error: Error | ApiError | PrismaClientKnownRequestError,
  { entity }: CatchResolverErrorConfig<Context>,
): never {
  console.error(error);

  if (isApiError(error)) {
    throw error;
  }

  // Prisma 'Record Not Found' Errors https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
  if ("code" in error) {
    switch (error.code) {
      case "P2025": {
        throw new ApiError({ type: ApiErrorType.NOT_FOUND, message: `${entity} not found` });
      }
      case "P2002": {
        throw new ApiError({
          type: ApiErrorType.CONFLICT,
          message: `${entity} already exists.`,
        });
      }
      case "P2003": {
        throw new ApiError({
          type: ApiErrorType.FOREIGN_KEY_CONSTRAINT,
          message: `${entity} is being referenced by other records in the database.`,
        });
      }
    }
  }
  // it's a Zod error: https://zod.dev/ERROR_HANDLING
  // else if ("issues" in error) {
  //   throw new ApiError({
  //     type: ApiErrorType.BAD_REQUEST,
  //     message: `${entity} has invalid fields: ${error.issues
  //       .flatMap((issue) => issue.path.filter((val) => typeof val === "string"))
  //       .join(", ")}.`,
  //   });
  // }

  throw new ApiError({ type: ApiErrorType.UNHANDLED, message: error.message });
}
