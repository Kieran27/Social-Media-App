import { useMutation } from "react-query";
import deleteComment from "../frontend - lib/axiosCalls/deleteComment";

const useDeleteComment = (postId: string) => {
  const { mutate, isLoading } = useMutation((commentId: string) =>
    deleteComment(postId, commentId)
  );

  return { isLoading, mutate };
};

export default useDeleteComment;
