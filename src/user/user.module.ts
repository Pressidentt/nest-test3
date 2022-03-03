import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Role } from "../role/role.model";
import { UserRole } from "../common/user-role";
import { RoleModule } from "../role/role.module";
import { AuthModule } from "../auth/auth.module";
import { UserPost } from "../user-post/user-post.model";

@Module({
  imports: [
    SequelizeModule.forFeature([User,Role, UserRole, UserPost]),
    RoleModule, forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}