import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const decodedUser = req.user as {
      id: string;
      email: string;
      name: string;
      userName: string;
      imageProfile: string;
    };

    if (user.id !== decodedUser.id) {
      throw new ForbiddenException();
    }

    return { user: req.user };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return {
      users,
    };
  }
}
