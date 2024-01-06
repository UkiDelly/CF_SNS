import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}


  async createUser(nickname: string, email: string, password: string) {
    const user = this.userRepository.create({ nickname, email, password });
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async getAllUser() {
    const user = await this.userRepository.find();
    return user;
  }
}
