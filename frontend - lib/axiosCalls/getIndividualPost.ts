import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

type TPostID = {
  postId: string | undefined | string[];
};

const getIndividualPost = (postId: string | undefined | string[]) => {
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
