import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createHash, isValidPassword } from './utils/user.utils';
import { RequestUser, UserLogin } from './types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async getByEmail(email: string): Promise<UserDocument | null>{
    try {
      return await this.UserModel.findOne({ email })
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(CreateUserDto: CreateUserDto): Promise<UserDocument | null>{
    try {
      const { email, password } = CreateUserDto;
      const exists = await this.getByEmail(email);
      if(exists) throw new ConflictException('User already exists');
      return await this.UserModel.create({
        ...CreateUserDto,
        password: createHash(password)
      })
    } catch (error) {
      throw new Error(error);
    }
  }


  generateToken(user: UserDocument): string {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    };
    return this.JwtService.sign(payload);
  }

  async login(user: UserLogin): Promise<string> {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if(!userExist) throw new UnauthorizedException('invalid credentials');
      // const passValid = isValidPassword(password, user);
      // console.log(passValid);
      // if(!passValid) throw new UnauthorizedException('invalid credentials');
      return this.generateToken(userExist)
    } catch (error) {
      throw new Error(error);
    }
  }


  profile(req: RequestUser){
    try {
      return req.user
    } catch (error) {
      throw new Error(error);
    }
  }
}
