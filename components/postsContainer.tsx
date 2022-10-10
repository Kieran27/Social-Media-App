import React from "react";
import Post from "./post";
import CreatePostForm from "./postCreation/createPostElement";

const PostsContainer = ({ posts }: any) => {
  return (
    <>
      <section className="col-span-full lg:col-span-8 xl:col-span-6 bg-white shadow-xl py-3 rounded-2xl border ">
        <div className="mt-5">
          <CreatePostForm />
          {posts?.map((post: any) => {
            return <Post key={post._id} postData={post} />;
          })}
        </div>
      </section>
    </>
  );
};

export default PostsContainer;
