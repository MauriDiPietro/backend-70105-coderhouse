import { NotFoundError, UnhauthorizedError } from "../utils/error.custom.js";
import httpResponse from "../utils/http.response.js";

export const errorHandler = (error, req, res, next) => {
    // console.log(error);
    console.log('LLEGÓ AL MIDDLEWARE');
    if (error instanceof NotFoundError) return httpResponse.NotFound(res, error);
    if (error instanceof UnhauthorizedError) return httpResponse.Unauthorized(res, error);
    return httpResponse.ServerError(res, error);
  };
  