import axios from "./axiosInstance";

const createComment = (
  postId: string,
  content: string,
  user_id: string | undefined
) => {
  return axios.post(`post/${postId}/comments`, { content, user_id });
};

export default createComment;
