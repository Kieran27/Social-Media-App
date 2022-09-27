import axios from "./axiosInstance";

const signup = (
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
) => {
  return axios.post("auth/signup", {
    email,
    username,
    password,
    passwordConfirm,
  });
};

export default signup;
