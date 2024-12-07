import { NewsModel } from "../../models/news.model.js";
import { logger } from "../../../logs/news.logs.js";

class DaoMongo {
  async getAllNews() {
    try {
      return await NewsModel.find({});
    } catch (error) {
      logger.fatal(error);
    }
  }

  async getNew(id) {
    try {
      return await NewsModel.findById(id);
    } catch (error) {
      logger.fatal(error);
    }
  }

  async createNew(obj) {
    try {
      return await NewsModel.create(obj);
    } catch (error) {
      logger.fatal(error);
    }
  }

  async updateNew(id, body) {
    try {
      return await NewsModel.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (error) {
      logger.fatal(error);
    }
  }

  async deleteNew(id) {
    try {
      return await NewsModel.findByIdAndDelete(id);
    } catch (error) {
      logger.fatal(error);
    }
  }
}

export const daoNews = new DaoMongo();
