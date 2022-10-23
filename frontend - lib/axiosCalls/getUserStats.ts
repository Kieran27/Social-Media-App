import axios from "./axiosInstance";
import getTokenFromStorage from "../getStorage";

const getUserStats = () => {
  const userId = getTokenFromStorage().id;
  const refreshToken = getTokenFromStorage().refreshToken;
  return axios.get(`user/profile/${userId}`, {
    headers: {
      Authorization: refreshToken,
    },
  });
};

export default getUserStats;
