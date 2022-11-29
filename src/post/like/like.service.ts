import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async addLike(dto: LikeDto) {
    const { email, name, userName, imageProfile, postId } = dto;
    const like = await this.prisma.like.create({
      data: {
        email: String(email),
        name: String(name),
        userName: String(userName),
        postId: String(postId),
        imageProfile: String(imageProfile),
      },
    });
    if (!like) {
      throw new NotFoundException();
    }
    return {
      like,
    };
  }

  async deleteLike(id: string) {
    const like = await this.prisma.like.delete({
      where: {
        id: String(id),
      },
    });
    if (!like) {
      throw new NotFoundException();
    }
    return {
      like,
    };
  }
}
