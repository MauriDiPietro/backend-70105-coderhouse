import express from "express";
import { errorHandler } from "./error.handler.js";
import { NotFoundError, UnhautorizedError } from "./custom.error.js";
import httpResponse from "./http.response.js";

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    const admin = false;
    const array = null;
    // const array = [{name: 'Juan'}]
    if(!admin) throw new UnhautorizedError("No está autorizado");
    if(!array) throw new NotFoundError('data is null');
    return httpResponse.Ok(res, array)
  } catch (error) {
    next(error)
  }
});

app.use(errorHandler);

app.listen(8080, () => {
  console.log("🚀 Server listening on port 8080");
});
