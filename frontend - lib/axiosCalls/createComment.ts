import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const createComment = (
  postId: string,
  content: string,
  user_id: string | undefined,
  commentId?: string
) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.post(
    `${postId}/comments`,
    { content, user_id, commentId },
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export default createComment;
