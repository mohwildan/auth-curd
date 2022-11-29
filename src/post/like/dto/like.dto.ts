import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LikeDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  imageProfile: string;
}
