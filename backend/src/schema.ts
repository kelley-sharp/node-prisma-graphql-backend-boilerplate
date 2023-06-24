import { printSchema, lexicographicSortSchema } from "graphql";
import { writeFileSync } from "fs";
import { builder } from "src/builder";

export const schema = builder.toSchema();

if (process.env.NODE_ENV !== "production") {
  // print schema for readability
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync(__dirname + "/schema.graphql", schemaAsString);
}
