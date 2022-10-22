import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const deleteComment = (postId: string, commentId: string) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.delete(`/${postId}/comments/${commentId}`, {
    headers: { Authorization: refreshToken },
  });
};

export default deleteComment;
