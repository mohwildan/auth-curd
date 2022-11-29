import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [CommentModule, LikeModule]
})
export class PostModule {}
