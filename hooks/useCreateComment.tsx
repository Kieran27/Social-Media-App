import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import createComment from "../frontend - lib/axiosCalls/createComment";

type CommentData = {
  content: string;
  userId: string | undefined;
  postId: string;
  commentId?: string;
};

const useCreateComment = () => {
  // Router for refreshes
  const router = useRouter();

  const { isLoading, mutate } = useMutation(
    (commentData: CommentData) =>
      createComment(
        commentData.postId,
        commentData.content,
        commentData.userId,
        commentData.commentId
      ),
    {
      onSuccess: () => {
        router.reload();
      },
      onError: (error: any) => {
        console.log(error);
        const message = error.response.data.error;
        toast.error(message, {
          id: "commentCreationError",
        });
      },
    }
  );

  return {
    isLoading,
    mutate,
  };
};

export default useCreateComment;
