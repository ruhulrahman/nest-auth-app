import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// import { AuthGuard } from '../auth/auth.guard';
import { PostService } from '../services/post.service';

@Controller('post')
// @UseGuards(AuthGuard) // Protect all routes in this controller
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Post()
  create(@Body() createPostDto) {
    console.log('createPostDto', createPostDto);
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
