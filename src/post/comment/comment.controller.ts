import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto, UpdateCommentDto } from './dto/comment.dto';

@Controller('/post/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAllComment() {
    return this.commentService.getAllComments();
  }

  @Post()
  createComment(@Body() dto: CommentDto) {
    return this.commentService.createComment(dto);
  }

  @Put(':id')
  updateComment(@Param() param: { id: string }, dto: UpdateCommentDto) {
    return this.commentService.updateComment(param.id, dto);
  }

  @Delete(':id')
  deleteComment(@Param() param: { id: string }) {
    return this.commentService.deleteComment(param.id);
  }
}
