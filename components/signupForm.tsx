import { useState } from "react";

interface IProps {
  changeAuthForm: () => void;
}

const SignupForm = ({ changeAuthForm }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const displayShowPassword: () => void = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  return (
    <section className="flex flex-col justify-center items-center min-h-screen min-w-full">
      <h2 className="text-5xl font-semibold tracking-wide">Sign up</h2>
      <div className="bg-white shadow-md w-3/4 md:w-1/2 rounded px-8 pt-6 pb-8 mb-4 mt-4 flex flex-col">
        <form action="">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Email <span className="text-red-500 text-md">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-grey-darker"
              type="email"
              placeholder="Enter your email"
            />
            <span className=" block mt-3 text-sm  text-red-500">
              * This field is required
            </span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Username <span className="text-red-500 text-md">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full mb-2 py-3 px-4 text-grey-darker"
              type="text"
              placeholder="Enter your username"
            />
            <span className=" block mt-1 text-sm  text-red-500">
              * This field is required
            </span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Password <span className="text-red-500 text-md">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-grey-darker"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span className=" block mt-3 text-sm  text-red-500">
              * This field is required
            </span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-md font-bold mb-2"
            >
              Confrim Password <span className="text-red-500 text-md">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-grey-darker"
              type="text"
              placeholder="Confirm Password"
            />
            <span className=" block mt-3 text-sm  text-red-500">
              * This field is required
            </span>
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
          <div className="flex justify-end">
            <input
              type="submit"
              value="Login"
              className="bg-emerald-500 cursor-pointer w-full text-white font-semibold py-2 px-6 rounded-2xl text-l hover:bg-emerald-300"
            />
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
    </section>
  );
};

export default SignupForm;
