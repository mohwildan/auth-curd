import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { LikeService } from './like.service';

@Controller('/post/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  addLike(@Body() dto: LikeDto) {
    return this.likeService.addLike(dto);
  }

  @Delete(':id')
  deleteLike(@Param() param: { id: string }) {
    return this.likeService.deleteLike(param.id);
  }
}
