import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: Partial<CreateUserDto>) {
    await this.usersService.createUser(userData);
  }

  @Post('login')
  async login(@Body() userLogin: LoginUserDto) {
    return await this.usersService.loginUser(userLogin);
  }
}
