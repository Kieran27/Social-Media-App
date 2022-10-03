import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(8).max(16),
  password: yup.string().required().min(8).max(16),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export { signupSchema };
