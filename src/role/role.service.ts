import { Injectable } from "@nestjs/common";
import { Role } from "./role.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleService {

  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

  async getAll(): Promise<Role[]> {
    const roles: Role[] = await this.roleRepository.findAll({include: {all: true}});
    return roles;
  }

  async getOne(value: string): Promise<Role> {
    const role: Role = await this.roleRepository.findOne({where: {value}, include: {all: true}});
    return role;
  }

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role: Role = await this.roleRepository.create(dto);
    return role;
  }

  async deleteRole(id: number): Promise<Role> {
    const role: Role = await this.roleRepository.findByPk(id);
    await this.roleRepository.destroy({where: {id}});

    return role
  }
}