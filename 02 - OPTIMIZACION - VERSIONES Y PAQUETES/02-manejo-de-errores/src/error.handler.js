import { NotFoundError, UnhautorizedError } from "./custom.error.js";
import httpResponse from "./http.response.js";

export const errorHandler = (error, req, res, next) =>{
    // let status = 500;
    // if(error instanceof UnhautorizedError) status = 401;
    // if(error instanceof NotFoundError) status = 404;
    // res.status(status).send({
    //     status,
    //     error: error.name,
    //     message: error.message
    // })
    if(error instanceof UnhautorizedError) return httpResponse.Unauthorized(res, error)
    if(error instanceof NotFoundError) return httpResponse.NotFound(res, error)
        return httpResponse.ServerError(res, error)
}