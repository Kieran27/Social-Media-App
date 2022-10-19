import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
import getIndividualPost from "../frontend - lib/axiosCalls/getIndividualPost";
import deletePost from "../frontend - lib/axiosCalls/deletePost";
import editPost from "../frontend - lib/axiosCalls/editPost";
import { useRouter } from "next/router";

const useIndividualPost = (
  postId: string | undefined | string[],
  userId: string | undefined
) => {
  // State to determine edit form display
  const [editFormOpen, setEditFormOpen] = useState(false);

  // Create new query Client
  const queryClient = useQueryClient();

  // Router for redirects
  const router = useRouter();

  // Query to retrieve selected post
  const individualPost = useQuery([postId], () => getIndividualPost(postId));

  // State to determine edit form state
  const toggleEditForm = () => {
    setEditFormOpen((editFormOpen) => !editFormOpen);
  };

  // Mutation to create delete post
  const { isLoading, mutate } = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post Deleted!", {
        id: "postDeletionSuccess",
      });
      setTimeout(() => {
        router.push("/home");
      }, 1500);
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.error;
      toast.error(message, {
        id: "postDeletionError",
      });
    },
  });

  // Mutation to edit post
  const editPostMutation = useMutation(
    (updatedPostContent: string) => editPost(updatedPostContent, postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([postId]);
        toast.success("Post Updated!", {
          id: "postUpdatedSuccess",
        });
        setTimeout(() => {
          router.reload();
        }, 300);
      },
      onError: (error: any) => {
        console.log(error);
        const message = error.response.data.error;
        toast.error(message, {
          id: "postUpdatedError",
        });
      },
    }
  );

  return {
    individualPost,
    isLoading,
    mutate,
    editFormOpen,
    toggleEditForm,
    editPostMutation,
  };
};

export default useIndividualPost;
