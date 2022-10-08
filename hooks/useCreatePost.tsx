import { useState } from "react";
import { useMutation } from "react-query";
import createPost from "../frontend - lib/axiosCalls/createPost";

type nimious = {
  content: string;
  userId: string | undefined;
};

const useCreatePost = () => {
  const [createModal, setCreateModal] = useState(false);
  const [fetchingState, setFetchingState] = useState<null | string>(null);

  const toggleCreateModal = () => {
    setCreateModal((createModal) => !createModal);
  };

  const createPostMutation = useMutation(
    (postData: nimious) => createPost(postData.content, postData.userId),
    {
      onSuccess: (data) => {
        console.log(data);
        setFetchingState("Success");
      },
      onError: (error) => {
        setFetchingState("error");
        console.log(error);
      },
    }
  );

  return {
    createModal,
    toggleCreateModal,
    createPostMutation,
    fetchingState,
  };
};

export default useCreatePost;
