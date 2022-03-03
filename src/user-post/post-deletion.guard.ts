import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserPostService } from "./user-post.service";
import { UserData } from "../auth/auth.service";
import { authorizedUser } from "../auth/auth.guard";
import { UserPost } from "./user-post.model";

@Injectable()
export class PostDeletionGuard implements CanActivate {

  constructor(private readonly postService: UserPostService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user: UserData = authorizedUser;
    const req: any = context.switchToHttp().getRequest();

    const post: UserPost = await this.postService.getOne(req.body.id);
    if (!post) throw new HttpException('post doesn\'t exit',HttpStatus.BAD_REQUEST);

    if (user.id != post.userId) throw new HttpException('only the creator of the post can delete it',HttpStatus.FORBIDDEN);
    return true;
  }
}