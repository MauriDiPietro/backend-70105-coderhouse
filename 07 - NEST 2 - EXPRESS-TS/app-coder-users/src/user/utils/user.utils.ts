import { hashSync, compareSync } from 'bcryptjs';
import { UserLogin } from '../types/user';

export const createHash = (password: string) => hashSync(password, 10);

export const isValidPassword = (password: string, user: UserLogin): boolean =>
  compareSync(password, user.password);
