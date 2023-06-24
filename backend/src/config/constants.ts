import * as dotenv from "dotenv";
import { CookieOptions } from "express";
dotenv.config();

// environment variables

export const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev";
export const DATABASE_URL = process.env.DATABASE_URL ?? "";

export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || "localhost";

export const DEPLOYED_HOST = process.env.DEPLOYED_HOST || "";
export const DEPLOYED_CLIENT_HOST = process.env.DEPLOYED_CLIENT_HOST || "";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

//various configs

export const SESSION_COOKIE_NAME = "user-session";
export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  domain: COOKIE_DOMAIN,
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};
