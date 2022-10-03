import axios from "axios";

interface IProps {
  changeAuthForm: () => void;
}

interface ISignup {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export { IProps, ISignup };
