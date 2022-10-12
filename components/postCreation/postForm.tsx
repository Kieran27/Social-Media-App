import { IoImageOutline } from "react-icons/io5";
import { HiEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostSchema } from "../../frontend - lib/yupSchemas";
import useCreatePost from "../../hooks/useCreatePost";
import { useAuth } from "../../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

type TProps = {
  toggle: () => void;
};

type TPostCreate = {
  content: string;
};

const PostForm = ({ toggle }: TProps) => {
  // Define state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Custom hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostCreate>({
    resolver: yupResolver(createPostSchema),
  });
  const { isLoading, mutate } = useCreatePost();
  const { user } = useAuth();

  // Component functions
  const onSubmit: SubmitHandler<TPostCreate> = (data) => {
    const { content } = data;
    mutate({ content: content, userId: user?.id });
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);
  };

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 px-5 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-5 py-5">
            <div className="flex justify-center relative">
              <h5 className="text-2xl font-semibold">Create Post</h5>
              <button
                className="absolute right-0 flex items-center justify-center bg-gray-200 w-8 rounded-full h-8 hover:bg-gray-400 font-bold"
                onClick={toggle}
              >
                X
              </button>
            </div>
            <div className="mt-6 relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className="bg-white border w-full px-5 py-3 text-xl focus:border-gray-300 resize-none"
                  {...register("content")}
                  cols={30}
                  rows={5}
                  placeholder="Whats on your mind?"
                ></textarea>
                {errors.content && (
                  <span className=" block mt-1 mb-3 text-sm  text-red-500">
                    {` * ${errors.content?.message}`}
                  </span>
                )}
                <div className="flex justify-between px-3">
                  <button className="text-4xl text-emerald-400 hover:text-emerald-200">
                    <IoImageOutline />
                  </button>
                  <button className="text-4xl text-emerald-400 hover:text-emerald-200">
                    <HiEmojiHappy />
                  </button>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="text-gray-700 hover:text-gray-400"
                    onClick={toggle}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-500 text-white font-medium px-4 py-2 rounded-2xl hover:bg-emerald-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <ClipLoader
                        color={"#fff"}
                        loading={isLoading}
                        size={20}
                      />
                    ) : (
                      "Create Post"
                    )}
                  </button>
                </div>
              </form>
              {showEmojiPicker && (
                <div className="absolute right-0 bottom-0">
                  <EmojiPicker />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PostForm;
