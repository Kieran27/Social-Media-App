import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const likeComment = (commentId: string) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.post(
    `/user/reacts/comments/${commentId}`,
    {},
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export default likeComment;
