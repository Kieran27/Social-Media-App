import { useState, useEffect } from "react";
import likePost from "../frontend - lib/axiosCalls/likePost";
import { useMutation } from "react-query";
import { useAuth } from "./useAuth";
import { IPost } from "../frontend - lib/interfaces";
import { toast } from "react-hot-toast";

const useLikePost = (postData: IPost) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(postData?.likes.length);
  const [liked, setLiked] = useState(false);

  const { isLoading, mutate } = useMutation(
    (commentId: string) => likePost(commentId),
    {
      onError: () => {
        toast.error("Something went wrong...", {
          id: "postLikeError",
        });
      },
    }
  );

  const handleLike = () => {
    if (liked) {
      setLiked(!liked);
      setLikes(likes - 1);
      mutate(postData._id);
    } else {
      setLiked(true);
      setLikes(likes + 1);
      mutate(postData._id);
    }
  };

  useEffect(() => {
    if (user) {
      setLiked(postData?.likes.includes(user.id));
    }
  }, [postData?.likes, user]);

  useEffect(() => {
    if (postData) {
      setLikes(postData.likes.length);
    }
  }, [postData]);

  return {
    isLoading,
    mutate,
    handleLike,
    likes,
    liked,
  };
};

export default useLikePost;
