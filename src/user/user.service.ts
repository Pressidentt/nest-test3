import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
import { RoleService } from "../role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { Role } from "../role/role.model";
import { RemoveRoleDto } from "./dto/remove-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { UnBanUserDto } from "./dto/unBan-user.dto";
import { authorizedUser } from "../auth/auth.guard";

type ValidatedObject = {
  validUser: User,
  validRole: Role
}

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User,
              private readonly roleService: RoleService) {}

  /* <<== Inaccessible by user ==>> */
  async createUser(dto: RegisterUserDto): Promise<User>  {
    const user: User = await this.userRepository.create(dto);
    await this.addRole({
      email: user.email,
      value: 'Regular'
    });

    return user;
  }
  /* <<== Inaccessible by user ==>> */

  /* <<== Everyone ==>> */
  async getAll(): Promise<User[] | undefined> {
    const users: User[] = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getOne(email: string): Promise<User | undefined> {
    const user: User =  await this.userRepository.findOne({where: {email}, include: {all: true}})
    return user;
  }

  async deleteUser(): Promise<User> {
    const id: number = authorizedUser.id;
    const user = await this.userRepository.findByPk(id);
    await this.userRepository.destroy({where: {id}});

    return user;
  }
  /* <<== Everyone ==>> */

  /* <<== Membership ==>> */
  async getMembership(): Promise<User> {
    const userEmail: string = authorizedUser.email;
    const user: User = await this.addRole({
      email: userEmail,
      value: 'Membership'
    });

    return user;
  }
  /* <<== Membership ==>> */

  /* <<== Admin ==>> */
  async addRole(dto: AddRoleDto): Promise<User> {
    const validatedObj: ValidatedObject = await this.validateUserAndRole(dto.email, dto.value);
    const user: User = validatedObj.validUser;
    const role: Role = validatedObj.validRole;

    //check if user doesn't have this role and add it
    if (user.roles.find((userRole: Role) => userRole.value === role.value)) throw new HttpException('user already has this role',HttpStatus.BAD_REQUEST);
    await user.$add('role',role.id);

    return user;
  }

  async removeRole(dto: RemoveRoleDto): Promise<User> {
    const validatedObj: ValidatedObject = await this.validateUserAndRole(dto.email, dto.value);
    const user: User = validatedObj.validUser;
    const role: Role = validatedObj.validRole;

    //check if user has this role and remove it
    if (!user.roles.find((userRole: Role) => userRole.value === role.value)) throw new HttpException('user doesn\'t have this role', HttpStatus.NOT_FOUND);
    await user.$remove('role',role.id);

    return user;
  }

  async banUser(dto: BanUserDto): Promise<User> {
    //get and check if user exist in database
    const user: User = await this.getOne(dto.email);
    if (!user) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);

    user.isBanned = true;
    user.banReason = dto.banReason;
    await user.save();

    return user;
  }

  async unBanUser(dto: UnBanUserDto): Promise<User> {
    //get and check if user exist in database
    const user: User = await this.getOne(dto.email);
    if (!user) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);

    user.isBanned = false;
    user.banReason = null;
    await user.save();

    return user;
  }
  /* <<== Admin ==>> */

  /* <<== Utilities ==>> */
  private async validateUserAndRole(email: string, value: string): Promise<ValidatedObject> {
    //get and check if user exist in database
    const user: User = await this.getOne(email);
    if (!user) throw new HttpException('user is not found',HttpStatus.NOT_FOUND);

    //get and check if role exist in database
    const role: Role = await this.roleService.getOne(value);
    if (!role) throw new HttpException('role is not found',HttpStatus.NOT_FOUND);

    const validatedObj: ValidatedObject = {
      validUser: user,
      validRole: role
    };

    return validatedObj;
  }
  /* <<== Utilities ==>> */
}