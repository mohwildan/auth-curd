import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  imageProfile: string;
}

export class UpdateCommentDto {
  @IsString()
  text: string;
}
