import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast("Here is your toast.", {
    id: "test",
  });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-center min-h-screen min-w-full text-4xl">
        Hello World
        <div>
          <button
            className=" mt-3 py-3 bg-green-300 px-7 rounded-xl text-white"
            onClick={notify}
          >
            Make Toast
          </button>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Home;
