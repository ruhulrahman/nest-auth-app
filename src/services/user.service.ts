import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return await this.userRepository.findOne({ where: { id } });
    }

    async updateIsActive(id: number, isActive: boolean): Promise<User> {
        await this.userRepository.update(id, { isActive });
        return await this.userRepository.findOne({ where: { id } });
    }

    async updateAdmin(id: number, isAdmin: boolean): Promise<User> {
        await this.userRepository.update(id, { isAdmin });
        return await this.userRepository.findOne({ where: { id } });
    }

    async updateEmail(id: number, newEmail: string): Promise<User> {
        await this.userRepository.update(id, { email: newEmail });
        return await this.userRepository.findOne({ where: { id } });
    }

    async updatePassword(id: number, newPassword: string): Promise<User> {
        await this.userRepository.update(id, { password: newPassword });
        return await this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }

    

    async updateUsername(id: number, newUsername: string): Promise<User> {
        await this.userRepository.update(id, { username: newUsername });
        return await this.userRepository.findOne({ where: { id } });
    }

    async updatePhone(id: number, newPhone: string): Promise<User> {
        await this.userRepository.update(id, { phone: newPhone });
        return await this.userRepository.findOne({ where: { id } });
    }

    // async updateAddress(id: number, newAddress: string): Promise<User> {
    //     await this.userRepository.update(id, { address: newAddress });
    //     return await this.userRepository.findOne({ where: { id } });
    // }

    // async updateBio(id: number, newBio: string): Promise<User> {
    //     await this.userRepository.update(id, { bio: newBio });
    //     return await this.userRepository.findOne({ where: { id } });
    // }

    // async updateBirthday(id: number, newBirthday: Date): Promise<User> {
    //     await this.userRepository.update(id, { birthday: newBirthday });
    //     return await this.userRepository.findOne({ where: { id } });
    // }

    // async updateGender(id: number, newGender: string): Promise<User> {
    //     await this.userRepository.update(id, { gender: newGender });
    //     return await this.userRepository.findOne({ where: { id } });
    // }

    // async updateCoverPhoto(id: number, photoPath: string): Promise<User> {
    //     await this.userRepository.update(id, { coverPhoto: photoPath });
    //     return await this.userRepository.findOne({ where: { id } });
    // }

    async updateProfilePhoto(id: number, photoPath: string): Promise<User> {
        await this.userRepository.update(id, { profilePhoto: photoPath });
        return await this.userRepository.findOne({ where: { id } });
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