import { useState } from "react";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import createPost from "../frontend - lib/axiosCalls/createPost";

type PostData = {
  content: string;
  userId: string | undefined;
};

const useCreatePost = () => {
  const [createModal, setCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setCreateModal((createModal) => !createModal);
  };

  const { isLoading, mutate } = useMutation(
    (postData: PostData) => createPost(postData.content, postData.userId),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
        const message = error.response.data.error;
        toast.error(message, {
          id: "brobbie",
        });
      },
    }
  );

  return {
    createModal,
    toggleCreateModal,
    isLoading,
    mutate,
  };
};

export default useCreatePost;
