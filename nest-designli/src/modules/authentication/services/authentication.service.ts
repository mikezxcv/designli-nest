import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { JWTPayload } from 'src/common/security/jwt.payload';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return this.userService.findAll();
  }

  async login(request: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = request;
    const valid = await this.validateUser(username, password);
    if (!valid) throw new UnauthorizedException('Not Valid Credentials');
    return await this.generateAccessToken(username);
  }

  async signup(request: SignupDto) {
    const {username} = request;
    let user: User;
    try{
       user = await this.userService.findByUserName(username);
    } catch (error) {
      if (error.status !== 404) throw error;
    }
    if (user) throw new UnauthorizedException('User Already Exists');
    return await this.userService.createUser(request);
  }

  private async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    return await this.userService.validatePassword(password, user.password);
  }

  private async generateAccessToken(
    username: string,
  ): Promise<LoginResponseDto> {
    const user = await this.userService.findByUserName(username);
    const payload: JWTPayload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
