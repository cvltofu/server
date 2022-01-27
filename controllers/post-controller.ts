import { Express } from 'express';
import postsService from '../services/posts-service';

class PostController {
  async getPosts(req: Express.Request, res: Express.Response, next) {
    try {
      const posts = await postsService.getPosts();

      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  async postPost(req: Express.Request, res: Express.Response, next) {
    try {
      const post = await postsService.postPost(req.body, req.user.id);

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req: Express.Request, res: Express.Response, next) {
    try {
      const post = await postsService.deletePost(req.params.id);

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
