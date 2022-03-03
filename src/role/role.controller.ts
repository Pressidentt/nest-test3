import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Role } from "./role.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "./role.decorator";
import { RoleGuard } from "./role.guard";
import { DeleteRoleDto } from "./dto/delete-role.dto";

@Controller('roles')
export class RoleController {

  constructor(private readonly roleService: RoleService) {}

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Get()
  async getAll(): Promise<Role[]> {
    const roles: Role[] = await this.roleService.getAll();
    return roles;
  }

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Get('/:value')
  async getOne(@Param('value') value: string): Promise<Role> {
    const role: Role = await this.roleService.getOne(value);
    return role;
  }

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Post('/create')
  async createRole(@Body() dto: CreateRoleDto): Promise<Role> {
    const role: Role = await this.roleService.createRole(dto);
    return role;
  }

  @Roles('Admin')
  @UseGuards(AuthGuard,RoleGuard)
  @Post()
  async deleteRole(@Body() dto: DeleteRoleDto): Promise<Role> {
    const role: Role = await this.roleService.deleteRole(dto.id);
    return role;
  }
}