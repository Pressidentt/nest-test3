import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { AddRoleDto } from "./dto/add-role.dto";
import { RemoveRoleDto } from "./dto/remove-role.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../role/role.decorator";
import { RoleGuard } from "../role/role.guard";
import { BanUserDto } from "./dto/ban-user.dto";
import { UnBanUserDto } from "./dto/unBan-user.dto";
import { GetMembershipGuard } from "./get-membership.guard";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  /* <<== Everyone ==>> */
  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    const users: User[] = await this.userService.getAll();
    return users;
  }

  @UseGuards(AuthGuard)
  @Get('/:email')
  async getOne(@Param('email') email: string): Promise<User> {
    const user: User = await this.userService.getOne(email);
    return user;
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(): Promise<User> {
    const user: User = await this.userService.deleteUser();
    return user;
  }
  /* <<== Everyone ==>> */

  /* <<== Membership ==>> */
  @UseGuards(AuthGuard,GetMembershipGuard)
  @Put()
  async getMembership(): Promise<User> {
    const user: User = await this.userService.getMembership();
    return user;
  }

  /* <<== Membership ==>> */

  /* <<== Admin ==>> */
  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Post('/role/add')
  async addRole(@Body() dto: AddRoleDto): Promise<User> {
    const user: User = await this.userService.addRole(dto);
    return user;
  }

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Post('role/remove')
  async removeRole(@Body() dto: RemoveRoleDto): Promise<User> {
    const user: User = await this.userService.removeRole(dto);
    return user;
  }

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Post('ban')
  async banUser(@Body() dto: BanUserDto): Promise<User> {
    const user: User = await this.userService.banUser(dto);
    return user;
  }

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Post('unBan')
  async UnBanUser(@Body() dto: UnBanUserDto): Promise<User> {
    const user: User = await this.userService.unBanUser(dto);
    return user;
  }
  /* <<== Admin ==>> */
}