import Services from "./class.services.js";
import factory from '../persistence/daos/factory.js';
const { productDao } = factory;
import ProductRepository from "../persistence/repository/product.repository.js";
const prodRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor(){
    super(productDao)
  }

  createProd = async (obj) => {
    try {
      return await prodRepository.createProd(obj);
    } catch (error) {
      throw new Error(error);
    }
  };

}


