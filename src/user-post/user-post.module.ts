import { forwardRef, Module } from "@nestjs/common";
import { UserPostController } from "./user-post.controller";
import { UserPostService } from "./user-post.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/user.model";
import { UserPost } from "./user-post.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UserPostController],
  providers: [UserPostService],
  imports: [SequelizeModule.forFeature([User, UserPost]), forwardRef(() => AuthModule)]
})
export class UserPostModule {}