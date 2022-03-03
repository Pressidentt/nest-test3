import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { User } from "../user/user.model";
import { AuthModule } from "../auth/auth.module";
import { Role } from "../role/role.model";
import { RoleModule } from "../role/role.module";
import { UserRole } from "../common/user-role";
import { UserPost } from "../user-post/user-post.model";
import { UserPostModule } from "../user-post/user-post.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: (process.env.POSTGRES_PORT as unknown) as number,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Role, UserRole, UserPost],
      autoLoadModels: true
    }),
    UserModule, AuthModule, RoleModule, UserPostModule
  ]
})
export class AppModule {}