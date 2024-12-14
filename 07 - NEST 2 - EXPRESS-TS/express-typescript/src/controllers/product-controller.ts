import { NextFunction, Request, Response } from "express";
import * as services from "../services/product-services";
import { httpResponse } from "../utils/http-response";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await services.create(req.body);
    httpResponse.Ok(res, response);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prods = await services.getAll();
    httpResponse.Ok(res, prods);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prod = await services.getById(id);
    httpResponse.Ok(res, prod);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prod = await services.update(id, req.body);
    httpResponse.Ok(res, prod);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prod = await services.remove(id);
    httpResponse.Ok(res, prod);
  } catch (error) {
    next(error);
  }
};
