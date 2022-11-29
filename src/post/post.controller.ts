import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostDto, UpdatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() param: { id: string }) {
    return this.postService.getPostById(param.id);
  }

  @Post()
  createPost(@Body() dto: PostDto) {
    return this.postService.createPost(dto);
  }

  @Delete(':id')
  deletePost(@Param() param: { id: string }) {
    return this.postService.deletePost(param.id);
  }
  @Put(':id')
  updatePost(@Param() param: { id: string }, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(param.id, dto);
  }
}
