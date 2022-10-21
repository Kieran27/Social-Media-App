import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const getIndividualComment = (postId: string, commentId: string) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.get(`/${postId}/comments/${commentId}`, {
    headers: {
      Authorization: refreshToken,
    },
  });
};

export default getIndividualComment;
