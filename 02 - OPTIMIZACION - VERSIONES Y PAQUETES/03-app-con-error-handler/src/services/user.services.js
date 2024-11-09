import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { userDao } = factory;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      return await this.dao.register(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      return await this.dao.login(user);
    } catch (error) {
      throw new Error(error);
    }
  };
}
