import { builder } from "src/builder";
import { db } from "src/db";

builder.prismaObject("Todo", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    title: t.exposeString("title"),
    content: t.exposeString("content", { nullable: true }),
  }),
});

export const TodoInput = builder.inputType("TodoInput", {
  fields: (t) => ({
    title: t.string(),
    content: t.string(),
  }),
});
