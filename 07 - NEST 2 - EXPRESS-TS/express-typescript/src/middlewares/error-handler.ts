import { NextFunction, Request, Response } from "express";
import { logger } from "../logs/logger";
import { NotFoundError, UnhauthorizedError } from "../utils/error.custom";
import { httpResponse } from "../utils/http-response";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error({
    name: error.name,
    message: error.message,
    url: req.url,
  });
  if (error instanceof NotFoundError) httpResponse.NotFound(res, error.message);
  if (error instanceof UnhauthorizedError) httpResponse.Unauthorized(res, error.message);
  httpResponse.ServerError(res, error, req.url);
};
