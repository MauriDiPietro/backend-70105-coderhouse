import { Request } from "express";

export type UserLogin = {
  email: string;
  password: string;
};

export type RequestUser = Request & {
  user: {
    first_name: string;
    last_name: string;
    role: string;
  }
}
