import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserPostService } from "./user-post.service";
import { UserPost } from "./user-post.model";
import { AuthGuard } from "../auth/auth.guard";
import { PostDeletionGuard } from "./post-deletion.guard";
import { DeletePostDto } from "./dto/delete-post.dto";

@Controller('posts')
export class UserPostController {

  constructor(private readonly postService: UserPostService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<UserPost[]> {
    const posts: UserPost[] = await this.postService.getAll();
    return posts;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<UserPost> {
    const post: UserPost = await this.postService.getOne(id);
    return post;
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createPost(@Body() dto: CreatePostDto): Promise<UserPost> {
    const post: UserPost = await this.postService.createPost(dto);
    return post;
  }

  @UseGuards(AuthGuard,PostDeletionGuard)
  @Post('/delete')
  async deletePost(@Body() dto: DeletePostDto): Promise<UserPost> {
    const post: UserPost = await this.postService.deletePost(dto.id);
    return post;
  }
}