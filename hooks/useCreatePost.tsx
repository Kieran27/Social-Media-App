import { useState } from "react";
import { useMutation } from "react-query";
import createPost from "../frontend - lib/axiosCalls/createPost";

const useCreatePost = () => {
  const [createModal, setCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setCreateModal((createModal) => !createModal);
  };

  const createPostMutation = useMutation(
    (postData: any) => createPost(postData.content),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return {
    createModal,
    toggleCreateModal,
    createPostMutation,
  };
};

export default useCreatePost;
