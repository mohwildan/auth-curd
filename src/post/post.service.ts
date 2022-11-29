import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prisma.post.findMany();
    return { posts };
  }

  async getPostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: String(id),
      },
    });

    return { post };
  }

  async createPost(dto: PostDto) {
    const { email, name, userName, userId, imageProfile, imagePost, text } =
      dto;
    const post = await this.prisma.post.create({
      data: {
        email: String(email),
        name: String(name),
        userName: String(userName),
        userId: String(userId),
        imageProfile: String(imageProfile),
        imagePost: String(imagePost),
        text: String(text),
      },
    });

    if (!post) {
      return new HttpException(
        'Create Post is invalid, try again',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      post,
    };
  }

  async deletePost(id: string) {
    const post = await this.prisma.post.delete({
      where: {
        id: String(id),
      },
    });
    if (!post) {
      return new HttpException(
        'Delete Post is invalid, try again',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      post,
    };
  }

  async updatePost(id: string, dto: UpdatePostDto) {
    const { text } = dto;
    const post = await this.prisma.post.update({
      where: {
        id: String(id),
      },
      data: {
        text: String(text),
      },
    });
    if (!post) {
      return new HttpException(
        'Delete Post is invalid, try again',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      post,
    };
  }
}
