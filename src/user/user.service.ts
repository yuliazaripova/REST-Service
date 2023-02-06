import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserModel } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  private readonly users: UserModel[] = [];

  async create(dto: CreateUserDto) {
    const { password, login } = dto;
    const user = {
      id: uuidv4(),
      password,
      login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    const user = this.users[index];
    if (user.password !== dto.oldPassword) throw new ForbiddenException();
    const newUser = {
      ...user,
      updatedAt: Date.now(),
      version: user.version + 1,
      password: dto.newPassword,
    };
    this.users[index] = newUser;
    return newUser;
  }

  async remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException();
    this.users.splice(index, 1);
  }
}
