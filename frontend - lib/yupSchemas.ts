import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(8).max(16),
  password: yup.string().required().min(8).max(16),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const createPostSchema = yup.object().shape({
  content: yup.string().required().min(1).max(1500),
});

const createCommentSchema = yup.object().shape({
  commentContent: yup.string().required().min(1).max(750),
});

const editPostSchema = yup.object().shape({
  updatedPostContent: yup.string().required().min(1).max(1500),
});

export {
  signupSchema,
  loginSchema,
  createPostSchema,
  createCommentSchema,
  editPostSchema,
};
