import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const getPosts = () => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.get("/posts", {
    headers: {
      Authorization: refreshToken,
    },
  });
};

export default getPosts;
