import axios from "./axiosInstance";

const login = (email: string, password: string) => {
  return axios.post("auth/login", {
    email,
    password,
  });
};

export default login;
