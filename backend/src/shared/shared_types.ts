import { Request, Response } from "express";

export type SchemaContext = {
  req: Request;
  res: Response;
};
