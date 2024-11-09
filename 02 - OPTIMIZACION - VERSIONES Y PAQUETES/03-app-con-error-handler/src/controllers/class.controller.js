import httpResponse from "../utils/http.response.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      return httpResponse.Ok(res, items);
    } catch (error) {
      console.log('PASÓ POR EL CONTROLLER');
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      return httpResponse.Ok(res, item);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);
      return httpResponse.Ok(res, newItem);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const itemUpdated = await this.service.update(id, req.body);
      return httpResponse.Ok(res, itemUpdated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const itemDel = await this.service.delete(id);
      return httpResponse.Ok(res, itemDel);
    } catch (error) {
      next(error);
    }
  };
}
