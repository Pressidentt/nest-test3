import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserPost } from "./user-post.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserData } from "../auth/auth.service";
import { authorizedUser } from "../auth/auth.guard";
import { DeletePostDto } from "./dto/delete-post.dto";

@Injectable()
export class UserPostService {

  constructor(@InjectModel(UserPost) private readonly postRepository: typeof UserPost) {}

  async getAll(): Promise<UserPost[]> {
    const posts: UserPost[] = await this.postRepository.findAll({include: {all: true}});
    return posts;
  }

  async getOne(id: number): Promise<UserPost> {
    const post: UserPost = await this.postRepository.findOne({where: {id}, include: {all: true}});
    return post;
  }

  async createPost(dto: CreatePostDto): Promise<UserPost> {
    const user: UserData = authorizedUser;
    const post: UserPost = await this.postRepository.create({...dto, userId: user.id});
    return post;
  }

  async deletePost(id: number): Promise<UserPost> {
    const post: UserPost = await this.getOne(id);
    await this.postRepository.destroy({where: {id}})

    return post;
  }
}