import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAllComments() {
    const comments = await this.prisma.comment.findMany();

    if (!comments) {
      throw new NotFoundException();
    }
    return {
      comments,
    };
  }

  async createComment(dto: CommentDto) {
    const { email, name, userName, imageProfile, postId, text } = dto;
    const comment = await this.prisma.comment.create({
      data: {
        email: String(email),
        name: String(name),
        userName: String(userName),
        postId: String(postId),
        imageProfile: String(imageProfile),
        text: String(text),
      },
    });
    if (!comment) {
      throw new NotFoundException();
    }
    return {
      comment,
    };
  }

  async updateComment(id: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: {
        id: String(id),
      },
      data: {
        text: String(dto.text),
      },
    });
    if (!comment) {
      throw new NotFoundException();
    }
    return {
      comment,
    };
  }

  async deleteComment(id: string) {
    const comment = await this.prisma.comment.delete({
      where: {
        id: String(id),
      },
    });
    if (!comment) {
      throw new NotFoundException();
    }
    return {
      comment,
    };
  }
}
