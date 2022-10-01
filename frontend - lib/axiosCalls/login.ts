import axios from "./axiosInstance";

const login = async (email: string, password: string) => {
  const response = await axios.post("auth/login", {
    email,
    password,
  });
  return response.data;
};

export default login;
