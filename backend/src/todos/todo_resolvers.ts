import { builder } from "src/builder";
import { TodoInput } from "src/todos/todo_types";
import { ApiError, ApiErrorType } from "src/errors/api_error";
import { db } from "src/db";
import { catchResolverError } from "src/errors/error_helpers";
import { assertNonNullish } from "src/errors/typeguards";
import { Prisma } from "@prisma/client";

builder.mutationFields((t) => ({
  //create
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
  //update
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
      const { title, content, completedAt } = input;

      const dataToUpdate: Prisma.TodoUpdateArgs["data"] = { content, completedAt };
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
  //delete
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

builder.queryFields((t) => ({
  //find one todo
  todo: t.prismaField({
    type: "Todo",
    nullable: true,
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
        const todo = await db.todo.findFirstOrThrow({
          ...query, //what does this do?
          where: { id },
        });
        return todo;
      } catch (error) {
        catchResolverError(error, { entity: "Todo", context });
      }
    },
  }),
  //find all todos
  todosList: t.prismaField({
    type: ["Todo"],
    nullable: true,
    errors: {
      types: [ApiError],
      directResult: false, //what is this?
      dataField: {
        name: "todos",
      },
    },
    resolve: async (query, root, args, context) => {
      try {
        return await db.todo.findMany();
      } catch (error) {
        catchResolverError(error, { entity: "Todo", context });
      }
    },
  }),
}));
