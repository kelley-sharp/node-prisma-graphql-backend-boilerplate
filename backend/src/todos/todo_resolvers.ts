import { builder } from "src/builder";
import { TodoInput } from "src/todos/todo_types";
import { ApiError, ApiErrorType } from "src/errors/api_error";
import { db } from "src/db";
import { catchResolverError } from "src/errors/error_helpers";
import { assertNonNullish } from "src/errors/typeguards";
import { Prisma } from "@prisma/client";

builder.mutationFields((t) => ({
  createTodo: t.prismaField({
    type: "Todo",
    args: {
      input: t.arg({ type: TodoInput, required: true }),
    },
    errors: {
      types: [ApiError],
      directResult: true,
    },
    resolve: async (query, root, args, context) => {
      const { input } = args;
      const { title } = input;
      assertNonNullish(
        title,
        new ApiError({ type: ApiErrorType.BAD_REQUEST, message: `Title is a required field.` }),
      );

      try {
        const todo = await db.todo.create({
          data: {
            ...input,
            title,
          },
        });
        return todo;
      } catch (error) {
        catchResolverError(error, { entity: "Todo", context });
      }
    },
  }),
  updateTodo: t.prismaField({
    type: "Todo",
    args: {
      id: t.arg({ type: "Int", required: true }),
      input: t.arg({ type: TodoInput, required: true }),
    },
    errors: {
      types: [ApiError],
      directResult: true,
    },
    resolve: async (query, root, args, context) => {
      const { id, input } = args;
      const { title, content } = input;

      const dataToUpdate: Prisma.TodoUpdateArgs["data"] = { content };
      if (title) {
        dataToUpdate.title = title;
      }

      try {
        await db.todo.findFirstOrThrow({
          where: {
            id,
          },
        });
        const todo = await db.todo.update({
          where: {
            id,
          },
          data: dataToUpdate,
        });
        return todo;
      } catch (error) {
        catchResolverError(error, { entity: "Todo", context });
      }
    },
  }),
  deleteTodo: t.prismaField({
    type: "Todo",
    args: {
      id: t.arg({ type: "Int", required: true }),
    },
    errors: {
      types: [ApiError],
      directResult: true,
    },
    resolve: async (query, root, args, context) => {
      const { id } = args;

      try {
        await db.todo.findFirstOrThrow({
          where: {
            id,
          },
        });
        const todo = await db.todo.delete({
          where: {
            id,
          },
        });
        return todo;
      } catch (error) {
        catchResolverError(error, { entity: "Todo", context });
      }
    },
  }),
}));
