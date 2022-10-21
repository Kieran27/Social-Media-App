import { useQuery } from "react-query";
import getComments from "../frontend - lib/axiosCalls/getComments";

const useGetComments = (post_id: string) => {
  const { isLoading, data } = useQuery(["comments", post_id], () =>
    getComments(post_id)
  );

  return {
    isLoading,
    data,
  };
};

export default useGetComments;
