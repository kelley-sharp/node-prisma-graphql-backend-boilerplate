import * as dotenv from "dotenv";
dotenv.config();

// environment variables

export const DATABASE_URL = process.env.DATABASE_URL ?? "";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
