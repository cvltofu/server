import PostDto from '../dtos/post-dto';
import postModel from '../models/post-model';

class PostsService {
  async getPosts() {
    const posts = await postModel.find();

    return posts;
  }

  async postPost(content: string, id: string) {
    const post = await postModel.create({
      content,
      userId: id,
    });

    const postDto = new PostDto(post);

    return { post: postDto };
  }

  async deletePost(_id: string) {
    const post = await postModel.findByIdAndDelete(_id);

    return post;
  }
}

export default new PostsService();
