import axios from "./axiosInstance";

const createPost = (content: string, user_id: string | undefined) => {
  return axios.post("/posts", { content, user_id });
};

export default createPost;
