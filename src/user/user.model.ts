import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../role/role.model";
import { UserRole } from "../common/user-role";
import { UserPost } from "../user-post/user-post.model";

interface UserCreationAttribute {
  nickname: string;
  email: string;
  password: string;
}

export type Password = string;

@Table({tableName: 'users'})
export class User extends Model<User,UserCreationAttribute> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  }) id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  }) nickname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  }) email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  }) password: Password;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  }) isBanned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true
  }) banReason: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => UserPost)
  posts: UserPost[];
}