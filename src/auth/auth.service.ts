import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthSigninDto, AuthSignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signUp(dto: AuthSignUpDto) {
    const { name, email, userName, password, imageProfile } = dto;

    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (findUser) {
      throw new BadRequestException('Email alredy exits');
    }

    const hashPassword = await this.hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        userName,
        password: String(hashPassword),
        imageProfile,
      },
    });
    return {
      message: 'signup was succesfull',
      user: user,
    };
  }

  async signIn(dto: AuthSigninDto, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong Email');
    }

    const isMatch = await this.comparePassword(password, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException('Wrong Password');
    }

    const token = await this.signToken({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      userName: foundUser.userName,
      imageProfile: foundUser.imageProfile,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('jwt', token, {
      httpOnly: true,
    });
    return res.send({ token });
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  }

  async comparePassword(password: string, hash: string) {
    const match = await bcrypt.compare(password, hash);
    return match;
  }

  async signToken(args: {
    id: string;
    email: string;
    userName: string;
    imageProfile: string;
    name: string;
  }) {
    const payload = args;

    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
