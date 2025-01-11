import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '../controllers/post.controller';
import { Post } from '../models/post.entity';
import { PostService } from '../services/post.service';


@Module({
  imports: [TypeOrmModule.forFeature([Post])], // Register the User entity
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService], // Export if other modules need access
})
export class PostModule {}
