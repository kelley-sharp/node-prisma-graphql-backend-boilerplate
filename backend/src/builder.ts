import { DateTimeResolver, GraphQLJSON } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";
import { PrismaPlugin } from "@pothos/plugin-prisma";
import { PothosSimpleObjectsPlugin } from "@pothos/plugin-simple-objects";
import { PothosErrorsPlugin } from "@pothos/plugin-errors";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

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
    JSON: {
      Input: Prisma.JsonValue;
      Output: Prisma.JsonValue;
    };
  };
}>({
  plugins: [PrismaPlugin, PothosSimpleObjectsPlugin, PothosErrorsPlugin],
  prisma: {
    client: db,
  },
});
