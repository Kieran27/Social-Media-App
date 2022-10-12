import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import toast from "react-hot-toast";
import getIndividualPost from "../frontend - lib/axiosCalls/getIndividualPost";
import deletePost from "../frontend - lib/axiosCalls/deletePost";
import { useRouter } from "next/router";

const useIndividualPost = (postId: string | undefined | string[]) => {
  // Create new query Client
  const queryClient = useQueryClient();

  // Router for redirects
  const router = useRouter();

  // Query to retrieve selected post
  const individualPost = useQuery([postId], () => getIndividualPost(postId));

  // Mutation to create delete post
  const { isLoading, mutate } = useMutation(() => deletePost(postId), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      console.log(data);
      router.push("/home");
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.error;
      toast.error(message, {
        id: "postDeletionError",
      });
    },
  });

  return {
    individualPost,
    isLoading,
    mutate,
  };
};

export default useIndividualPost;
