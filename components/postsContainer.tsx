import React from "react";
import Post from "./post";

const PostsContainer = () => {
  return (
    <>
      <section className="col-span-full lg:col-span-8 xl:col-span-6 bg-white shadow-xl py-3 rounded-2xl border">
        <div className="mt-5">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
    </>
  );
};

export default PostsContainer;
