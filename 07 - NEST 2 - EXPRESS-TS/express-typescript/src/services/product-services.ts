import { ProductModel } from "../models/product-model";
import { Product, ProductMongoose } from "../types/product-types";
import { NotFoundError } from "../utils/error.custom";

export const create = async (
  product: Product
): Promise<ProductMongoose | null> => {
  try {
    const prod = await ProductModel.create(product);
    if (!prod) throw new Error("Error creating product");
    return prod;
  } catch (error) {
    throw error as Error;
  }
};
export const getAll = async (): Promise<ProductMongoose[] | []> => {
  try {
    return await ProductModel.find({});
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getById = async (id: string): Promise<ProductMongoose | null> => {
  try {
    const prod = await ProductModel.findById(id);
    if (!prod) throw new NotFoundError("Product Not Found");
    return prod;
  } catch (error) {
    throw error as Error;
  }
};

export const update = async (
  id: string,
  body: Product
): Promise<ProductMongoose | null> => {
  try {
    const prod = await ProductModel.findByIdAndUpdate(id, body, { new: true });
    if (!prod) throw new NotFoundError("Product Not Found");
    return prod;
  } catch (error) {
    throw error as Error;
  }
};

export const remove = async (id: string): Promise<ProductMongoose | null> => {
  try {
    const prod = await ProductModel.findByIdAndDelete(id);
    if (!prod) throw new NotFoundError("Product Not Found");
    return prod;
  } catch (error) {
    throw error as Error;
  }
};
