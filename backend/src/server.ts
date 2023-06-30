import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { isNotNull } from "./shared/typeguards";

import { IS_PRODUCTION } from "./config/constants";

const PORT = 8000;

const app = express();

const yoga = createYoga({
  schema,
  plugins: [IS_PRODUCTION ? useDisableIntrospection() : null].filter(isNotNull),
});

// Bind GraphQL Yoga to `/graphql` endpoint
app.use("/graphql", yoga);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`SSR-Todo Backend started on port ${PORT}`);
});
