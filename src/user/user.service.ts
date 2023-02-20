import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UpdatePasswordDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.save({ ...dto, version: 1 });
    return await this.findOne(user.id);
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userRepository.delete({ id });
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (user.password !== dto.oldPassword) throw new ForbiddenException();

    await this.userRepository.save({ ...user, password: dto.newPassword });

    return await this.findOne(id);
  }
}
