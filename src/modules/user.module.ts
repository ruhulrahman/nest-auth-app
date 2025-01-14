import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
// import { UserController } from '../controllers//user.controller';
import { User } from '../models//user.entity';
// import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  providers: [UserRepository],
  // controllers: [UserController],
  exports: [UserRepository], // Export if other modules need access
})
export class UserModule {}
