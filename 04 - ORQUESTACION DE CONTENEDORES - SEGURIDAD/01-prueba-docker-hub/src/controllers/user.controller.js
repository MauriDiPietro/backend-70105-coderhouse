import * as userService from "../services/user.service.js";

export const createUser = async (req, res, next) => {
  const { cant } = req.query;
  try {
    const response = await userService.createUsersMock(cant);
    res.status(200).json({ users: response, pid: process.pid });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const response = await userService.getUsers();
    res.status(200).json({ users: response,pid: process.pid });
  } catch (error) {
    next(error);
  }
};


