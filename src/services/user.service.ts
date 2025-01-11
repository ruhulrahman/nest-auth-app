import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}


    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }

    async updatePhoto(userId: number, photoPath: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        user.profilePhoto = photoPath;
        return this.userRepository.save(user);
      }
      
      async deletePhoto(userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        user.profilePhoto = null;
        return this.userRepository.save(user);
      }
}