import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const getComments = (post_id: string) => {
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.get(`${post_id}/comments`, {
    headers: {
      Authorization: refreshToken,
    },
  });
};

export default getComments;
