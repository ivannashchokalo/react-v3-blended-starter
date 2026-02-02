import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditPostData, Post, PostId } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  onEditPost: (post: EditPostData) => void;
}
export default function PostList({ posts, onEditPost }: PostListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDeletePost = (id: PostId) => {
    mutate(id);
  };

  const handleEditPost = (post: EditPostData) => {
    onEditPost(post);
  };

  return (
    <ul className={css.list}>
      {posts.map(({ id, title, body }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{body}</p>
          <div className={css.footer}>
            <button onClick={() => handleEditPost({ id, title, body })} className={css.edit}>
              Edit
            </button>
            <button onClick={() => handleDeletePost(id)} className={css.delete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
