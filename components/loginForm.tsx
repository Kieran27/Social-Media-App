import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../frontend - lib/yupSchemas";
import { ILogin } from "../frontend - lib/interfaces";
import { TLoginError } from "../frontend - lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import login from "../frontend - lib/axiosCalls/login";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface IProps {
  changeAuthForm: () => void;
}

const LoginForm = ({ changeAuthForm }: IProps) => {
  // Define state
  const [showPassword, setShowPassword] = useState(false);

  // Custom hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });
  const { handleLogin } = useAuth();

  // Mutation
  const loginMutation = useMutation(
    (data: ILogin) => login(data.email, data.password),
    {
      onSuccess: (data) => {
        handleLogin(data);
      },
      onError: (error: AxiosError<TLoginError>) => {
        console.log(error);
        const errorData = error as AxiosError;
        const message = errorData.response.data.error;
        toast.error(`${message}.`, {
          id: "loginError",
        });
      },
    }
  );

  // Component functions
  const displayShowPassword: () => void = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    const { email, password } = data;
    loginMutation.mutate({ email: email, password: password });
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-[85%] xl:min-h-screen min-w-full">
      <h2 className="text-5xl font-semibold tracking-wide">Login</h2>
      <div className="bg-white shadow-md w-10/12 md:w-6/12 xl:w-8/12 2xl:w-6/12 rounded px-4 md:px-8 pt-6 pb-8 mb-4 mt-4 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Email <span className="text-red-500 text-md">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-grey-darker"
              {...register("email", { required: true })}
              type="text"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className=" block mt-3 text-sm  text-red-500">
                {`* ${errors.email?.message}`}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Password <span className="text-red-500 text-md">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full mb-2 py-3 px-4 text-grey-darker"
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className=" block mt-1 text-sm  text-red-500">
                {` * ${errors.password?.message}`}
              </span>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 mb-3">
            <input
              type="checkbox"
              name="showPassword"
              value="showPassword"
              onClick={displayShowPassword}
            />
            <label
              htmlFor="showPassword"
              className="block text-gray-700 text-sm"
            >
              Show Password
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-emerald-500 cursor-pointer w-full md:w-2/3 lg:w-1/3 xl:w-1/4 flex justify-center items-center text-white font-semibold py-2 px-6 rounded-2xl text-l hover:bg-emerald-300"
            >
              {loginMutation.isLoading ? (
                <ClipLoader color={"#fff"} loading={true} size={20} />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-l">Don&apos;t have an account?</span>
        <button
          className="text-blue-400 underline text-l"
          onClick={changeAuthForm}
        >
          Register Here
        </button>
      </div>
      <Toaster />
    </section>
  );
};

export default LoginForm;
