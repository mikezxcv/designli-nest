import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const data = await this.userRepository.find();
    if (!data.length) {
      throw new NotFoundException('data not found');
    }
    return data;
  }

  async findByUserName(username: string) {
    const data = await this.userRepository.findOneBy({ username });
    if (!data) throw new NotFoundException('User Not Found');
    return data;
  }

  async findUserById(id: number) {
    const data = await this.userRepository.findOneBy({ id });
    if (!data) throw new NotFoundException('User Not found');
    return data;
  }

  async createUser(userDto: SignupDto) {
    userDto.password = await this.hashPassword(userDto.password);
    return await this.userRepository.save({
      name: userDto.name,
      username: userDto.username,
      email: userDto.email,
      password: userDto.password,
    });
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10); // Se utiliza saltRounds = 10
    return hashedPassword;
  }
}
