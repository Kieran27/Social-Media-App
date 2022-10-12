import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const deletePost = (
  postId: string | undefined | string[],
  userId: string | undefined
) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.delete(`/posts/${postId}`, {
    data: { user_id: userId },
    headers: { Authorization: refreshToken },
  });
};

export default deletePost;
