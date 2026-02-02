import axios from "axios";
import { EditPostData, Post, PostId } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText: string, page: number): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>("/posts", {
    params: {
      _page: page,
      _limit: 8,
      q: searchText,
    },
  });
  console.log(data);

  return data;
};

export const createPost = async (newPost: Pick<Post, "title" | "body">): Promise<Post> => {
  const { data } = await axios.post<Post>("/posts", newPost);
  return data;
};

export const editPost = async ({ id, ...postData }: EditPostData): Promise<Post> => {
  const { data } = await axios.patch<Post>(`/posts/${id}`, postData);
  return data;
};

export const deletePost = async (postId: PostId): Promise<Post> => {
  const { data } = await axios.delete<Post>(`/posts/${postId}`);
  return data;
};
