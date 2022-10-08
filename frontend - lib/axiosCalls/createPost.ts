import axios from "./axiosInstance";

const createPost = (content: string) => {
  return axios.post("/api/posts", { content });
};

export default createPost;
