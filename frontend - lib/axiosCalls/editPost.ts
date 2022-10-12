import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const editPost = (
  updatedPostContent: string,
  postId: string | undefined | string[],
  userId: string | undefined
) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.put(
    `/posts/${postId}`,
    {
      content: updatedPostContent,
    },
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export default editPost;
