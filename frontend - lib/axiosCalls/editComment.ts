import axios from "./axiosInstance";
import { TUpdatedCommentData } from "../types";
import getTokenFromStorage from "../getStorage";

const editComment = (updatedCommentData: TUpdatedCommentData) => {
  const { updatedCommentContent, postId, commentId } = updatedCommentData;
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.put(
    `${postId}/comments/${commentId}`,
    {
      content: updatedCommentContent,
    },
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export default editComment;
