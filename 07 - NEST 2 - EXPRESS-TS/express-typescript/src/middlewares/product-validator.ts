import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const prodSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(50).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});


export const validatePostProduct = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = prodSchema.validate(req.body, { abortEarly: false });
    error ? res.status(404).send(error) : next();
}