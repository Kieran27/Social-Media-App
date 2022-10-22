import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { TUpdatedCommentData } from "../frontend - lib/types";
import editComment from "../frontend - lib/axiosCalls/editComment";
import { toast } from "react-hot-toast";

const useUpdateComment = () => {
  // Router for refreshes
  const router = useRouter();

  const { isLoading, mutate } = useMutation(
    (mutatedData: TUpdatedCommentData) => editComment(mutatedData),
    {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        toast.error("Something went wrong", {
          id: "updateCommentError",
        });
      },
    }
  );

  return {
    isLoading,
    mutate,
  };
};

export default useUpdateComment;
