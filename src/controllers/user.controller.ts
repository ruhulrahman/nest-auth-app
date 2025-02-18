import { UpdateUserDto } from '@dto/user.dto';
import { Controller, Delete, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Express } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../services/user.service';

@Controller('users')
@UseGuards(AuthGuard) // Protect all routes in this controller
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filePath: file.path };
  }

  @Post('upload-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const user = await this.userService.updatePhoto(req.user.id, file.filename);
    return { message: 'Photo updated', user };
  }

  @Delete('delete-photo')
  async deletePhoto(@Req() req) {
    await this.userService.deletePhoto(req.user.id);
    return { message: 'Photo deleted successfully' };
  }

  @Delete('delete-account')
  async deleteAccount(@Req() req) {
    await this.userService.remove(req.user.id);
    return { message: 'Account deleted successfully' };
  }

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userService.findOne(req.user.id);
    return { user };
  }

  @Get('all-users')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get('search/:username')
  async searchUser(@Req() req, @Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return { user };
  }

  @Post('update-profile')
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, updateProfileDto);
    return { user };
  }
}
