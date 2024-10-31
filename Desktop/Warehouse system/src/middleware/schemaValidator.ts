import { RequestHandler, NextFunction, Response, Request } from "express";

import validationSchemas from "./validation-schemas.js";
//schemaValidator middleware
export const validateSchema: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }

  const result = validationSchemas[req.originalUrl.split("/")[1]].validate(
    req.body,
  );
  if (result.error) {
    return res.status(400).json({
      query: req.originalUrl,
      error: result.error.details[0].message.replaceAll(`\"`, ""),
    });
  }
  return next();
};
