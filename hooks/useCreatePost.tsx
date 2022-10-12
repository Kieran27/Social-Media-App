import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
import createPost from "../frontend - lib/axiosCalls/createPost";
import getPosts from "../frontend - lib/axiosCalls/getPosts";

type PostData = {
  content: string;
  userId: string | undefined;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const [createModal, setCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setCreateModal((createModal) => !createModal);
  };

  // Query to retrieve posts
  const posts = useQuery(["posts"], getPosts);

  // Mutation to create new post
  const { isLoading, mutate } = useMutation(
    (postData: PostData) => createPost(postData.content, postData.userId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        console.log(data);
      },
      onError: (error: any) => {
        console.log(error);
        const message = error.response.data.error;
        toast.error(message, {
          id: "postCreationError",
        });
      },
    }
  );

  return {
    createModal,
    toggleCreateModal,
    isLoading,
    mutate,
    posts,
  };
};

export default useCreatePost;
