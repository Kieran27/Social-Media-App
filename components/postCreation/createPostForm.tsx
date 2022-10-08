import React from "react";
import { IoImageOutline } from "react-icons/io5";
import { HiEmojiHappy } from "react-icons/hi";

const CreatePostForm = () => {
  return (
    <div className="flex items-center w-full px-5 py-3 mb-3 border gap-4">
      <div className="h-12 w-12 bg-emerald-200 rounded-full"></div>
      <div className="flex-grow bg-gray-200 py-3 px-5 rounded-2xl text-gray-600 cursor-pointer hover:bg-gray-300">
        What do you want to talk about today?
      </div>
    </div>
  );
};

export default CreatePostForm;
