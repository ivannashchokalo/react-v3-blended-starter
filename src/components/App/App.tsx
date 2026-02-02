import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { EditPostData } from "../../types/post";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [editedPost, setEditedPost] = useState<EditPostData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 500);

  const totalPages = Math.floor(100 / 8);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const createPost = () => {
    setIsModalOpen(true);
    setIsCreatePost(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsCreatePost(false);
    setEditedPost(null);
  };

  const editPost = (postToEdit: EditPostData) => {
    setIsModalOpen(true);
    setEditedPost(postToEdit);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchText={searchQuery} onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={createPost}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onCloseModal={closeModal}>
          {isCreatePost && <CreatePostForm onCloseModal={closeModal} />}
          {editedPost && <EditPostForm onCloseModal={closeModal} postToEdit={editedPost} />}
        </Modal>
      )}
      {data && data.length > 0 && <PostList posts={data} onEditPost={editPost} />}
    </div>
  );
}
