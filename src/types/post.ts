export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostId = Post["id"];

export interface EditPostData {
  id: number;
  title?: string;
  body?: string;
}
