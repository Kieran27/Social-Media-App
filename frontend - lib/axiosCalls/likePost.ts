import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const likePost = (postId: string) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.post(
    `/user/reacts/posts/${postId}`,
    {},
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export default likePost;
