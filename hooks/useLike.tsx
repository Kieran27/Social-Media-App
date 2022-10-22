import { useState, useEffect } from "react";
import likeComment from "../frontend - lib/axiosCalls/likeComment";
import { useMutation } from "react-query";
import { useAuth } from "./useAuth";
import { IComment } from "../frontend - lib/interfaces";

const useLike = (commentData: IComment) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(commentData?.likes.length);
  const [liked, setLiked] = useState(false);

  const { isLoading, mutate } = useMutation(
    (commentId: string) => likeComment(commentId),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const handleLike = () => {
    if (liked) {
      setLiked(!liked);
      setLikes(likes - 1);
      mutate(commentData._id);
    } else {
      setLiked(true);
      setLikes(likes + 1);
      mutate(commentData._id);
    }
  };

  useEffect(() => {
    if (user) {
      setLiked(commentData?.likes.includes(user.id));
    }
  }, [commentData?.likes, user]);

  useEffect(() => {
    if (commentData) {
      setLikes(commentData.likes.length);
    }
  }, [commentData]);

  return {
    isLoading,
    mutate,
    handleLike,
    likes,
    liked,
  };
};

export default useLike;
