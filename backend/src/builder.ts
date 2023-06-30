import { DateTimeResolver, GraphQLJSON } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import ErrorsPlugin from "@pothos/plugin-errors";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { Prisma } from "@prisma/client";
import { db } from "./db";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    ID: {
      Output: string;
      Input: string;
    };
    DateTime: {
      Output: Date;
      Input: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, SimpleObjectsPlugin, ErrorsPlugin],
  prisma: {
    client: db,
  },
});

builder.addScalarType("DateTime", DateTimeResolver, {});

builder.queryType();
builder.mutationType();
