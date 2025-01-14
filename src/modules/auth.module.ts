import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../controllers/auth.controller';
import { User } from '../models/user.entity';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register the User entity
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with a secure secret
      signOptions: { expiresIn: '1h' }, // Optional: Token expiration time
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if other modules need it
})
export class AuthModule {}
