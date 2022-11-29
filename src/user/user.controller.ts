import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { jwtAuhtGuard } from 'src/auth/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(jwtAuhtGuard)
  @Get(':id')
  getMyUser(@Param() param: { id: string }, @Req() req) {
    return this.userService.getMyUser(param.id, req);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
