import express from "express";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
// import { db } from "src/db";

import {
  COOKIE_OPTIONS,
  IS_PRODUCTION,
  SESSION_COOKIE_NAME,
  SESSION_SECRET,
} from "./config/constants";

const PORT = 8000;

const app = express();

app.use(
  session({
    genid: () => uuidv4(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: SESSION_COOKIE_NAME,
    unset: "destroy",
    cookie: COOKIE_OPTIONS,
    store: new PrismaSessionStore(new PrismaClient() as any, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

const yoga = createYoga({
  schema,
  plugins: [IS_PRODUCTION ? useDisableIntrospection() : null].filter(isNotNull),
});
