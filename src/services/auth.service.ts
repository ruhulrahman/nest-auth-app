import { RegisterDto } from '@dto/registerDto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  // async register(username: string, password: string): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = this.userRepository.create({
  //     username,
  //     password: hashedPassword,
  //   });
  //   return this.userRepository.save(user);
  // }

  async register(registerDto: RegisterDto): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { username: registerDto.username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = this.userRepository.create({
      username: registerDto.username,
      password: hashedPassword,
      isActive: registerDto.isActive,
    });

    await this.userRepository.save(newUser);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user.id, username: user.username };
    console.log('payload====', payload)
    return this.jwtService.sign(payload); // Generate JWT
  }
  

  async validateUser(username: string, password: string): Promise<User | null> {
    console.log('username====', username)
    const user = await this.userRepository.findOne({ where: { username } });
    console.log('user====', user)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
