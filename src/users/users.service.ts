import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    userData: Partial<User>,
  ): Promise<{ message: string; user: any }> {
    const { identification, ...rest } = userData;
    const passwordHash = await hash(identification, 10);
    const existingUser = await this.findUserByEmail(userData.email);

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const data = {
      ...rest,
      password: passwordHash,
      identification: identification,
    };

    const newUser = this.userRepository.create(data);
    const result = await this.userRepository.save(newUser);

    const token = this.jwtService.sign({
      id: result.id,
      email: result.email,
    });
    return {
      message: 'Usuario registrado exitosamente',
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
        token: token,
      },
    };
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async loginUser(
    userLogin: LoginUserDto,
  ): Promise<{ message: string; user: User; token }> {
    const { email, password } = userLogin;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', 403);
    }
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new HttpException('Invalid credentials', 403);
    }
    const payload = {
      name: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login successful',
      user: user,
      token,
    };
  }
}
