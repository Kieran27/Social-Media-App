import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../frontend - lib/axiosCalls/axiosInstance";
import { useState } from "react";
import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import login from "../../frontend - lib/axiosCalls/login";
import toast, { Toaster } from "react-hot-toast";

type LoginVariables = {
  email: string;
  password: string;
};

interface ILogin {
  email: string;
  password: string;
}

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginVariables>();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  /*
  const login = async () => {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    console.log(response);
    return response;
  };
  */

  const mutation = useMutation(
    (data: ILogin) => login(data.email, data.password),
    {
      onSuccess: (data) => {
        console.log(data);
        toast("Here is your toast.", {
          id: "nimious",
        });
      },
      onError: (error) => {
        console.log(error);
        const message = error.response.data.error;
        toast(`${message}.`, {
          id: "ryn",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<LoginVariables> = (data) => {
    const { email, password } = data;
    console.log(data);
    mutation.mutate({ email: email, password: password });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-center min-h-screen min-w-full text-4xl">
        <h2>Login</h2>
        <div className="bg-white shadow-md w-3/4 md:w-1/2 rounded px-8 pt-6 pb-8 mb-4 mt-4 flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker text-sm"
                {...register("email", { required: true })}
                id="email"
                type="text"
                placeholder="Username"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red text-sm rounded w-full py-2 px-3 mb-3"
                {...register("password", { required: true })}
                id="password"
                type="password"
                placeholder="******************"
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-300 text-lg hover:bg-blue-100 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Auth;
