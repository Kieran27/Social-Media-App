import axios from "./axiosInstance";

const getComments = (post_id: string) => {
  return axios.get(`${post_id}/comments`);
};

export default getComments;
