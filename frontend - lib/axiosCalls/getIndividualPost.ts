import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const getIndividualPost = (postId: string) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  if (postId) {
    return axios.get(`posts/${postId}`, {
      headers: {
        Authorization: refreshToken,
      },
    });
  }
};

export default getIndividualPost;
