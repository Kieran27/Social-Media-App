import React from "react";

const Comment = () => {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex gap-6 items-center">
        <div className="h-12 min-w-[3rem] block bg-emerald-400 rounded-full"></div>
        <div className="flex-grow bg-gray-100 rounded-3xl px-5 py-4">
          <span className="text-sm font-semibold tracking-wide">
            Author Name
          </span>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Doloremque, ullam rem. Sequi ad quos doloribus dolor ipsum aliquam
            voluptatibus veniam, quod odio, quo, necessitatibus voluptatem?
          </p>
        </div>
        <div className="flex flex-col">
          <button>Like</button>
          <span className="text-center text-xl">0</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
