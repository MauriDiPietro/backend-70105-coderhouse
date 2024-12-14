import { model, Schema } from "mongoose";
import { Product, ProductMongoose } from "../types/product-types";

const productSchema = new Schema<ProductMongoose>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = model("products", productSchema);
