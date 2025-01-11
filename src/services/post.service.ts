import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../models/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const post = this.postRepository.create(createPostDto);
        return this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findOne(id: number): Promise<Post> {
        return this.postRepository.findOne({ where: { id } });
    }

    async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        await this.postRepository.update(id, updatePostDto);
        return this.postRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.postRepository.delete(id);
        return;
    }
}