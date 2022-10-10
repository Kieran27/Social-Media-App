import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const createPost = (content: string, user_id: string | undefined) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.post(
    "/posts",
    { content, user_id },
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export default createPost;
