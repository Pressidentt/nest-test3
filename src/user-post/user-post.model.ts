import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";

interface PostCreationAttribute {
  direction: string;
  criteria: string;
  price: number;
  userId: number;
}

@Table({tableName: 'posts'})
export class UserPost extends Model<UserPost, PostCreationAttribute> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  }) id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  }) direction: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  }) criteria: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0
  }) price: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  }) userId: number;

  @BelongsTo(() => User)
  author: User;
}