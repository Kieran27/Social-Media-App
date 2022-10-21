import { useQuery } from "react-query";
import getIndividualComment from "../frontend - lib/axiosCalls/getIndividualComment";

const useGetComment = (postId: string, commentId: string) => {
  const { isLoading, data } = useQuery(["comment", postId, commentId], () =>
    getIndividualComment(postId, commentId)
  );

  return {
    isLoading,
    data,
  };
};

export default useGetComment;
