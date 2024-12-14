import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { RequestUser, UserLogin } from './types/user';
import { UserGuard } from './user.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const response = await this.userService.register(createUserDto);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({ message: error.message });
    }
  }

  @Post('/login')
  async login(@Body() user: UserLogin, @Res() res: Response): Promise<void> {
    try {
      const response = await this.userService.login(user);
      res
        .status(HttpStatus.OK)
        .cookie('token', response, { httpOnly: true })
        .json({ response: 'Login OK' });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }

  @Get('/profile')
  @UseGuards(UserGuard)
  profile(@Request() req: RequestUser) {
    return this.userService.profile(req);
  }
}
