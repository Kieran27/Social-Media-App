import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const deletePost = (postId: string | undefined | string[]) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.delete(`/posts/${postId}`, {
    headers: { Authorization: refreshToken },
  });
};

export default deletePost;
