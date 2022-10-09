import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCommentSchema } from "../../frontend - lib/yupSchemas";
import { Toaster } from "react-hot-toast";

type TCommentCreate = {
  commentContent: string;
};

const CommentForm = () => {
  const [expandedForm, setExpandedForm] = useState(false);

  // Custom hooks
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentCreate>({
    resolver: yupResolver(createCommentSchema),
  });

  // Component functions
  const onSubmit: SubmitHandler<TCommentCreate> = (data) => {
    console.log("Something");
    console.log(data);
  };

  const toggleExpandedForm = () => {
    setExpandedForm((expandedForm) => !expandedForm);
  };

  return (
    <section className="flex flex-col border-b">
      <div className="px-5 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("commentContent")}
            onFocus={() => setExpandedForm(true)}
            className="bg-gray-100 resize-none w-full px-5 py-3 rounded-3xl transition-[rows] focus:outline-gray-400"
            rows={expandedForm ? 5 : 1}
            placeholder="Add new comment..."
          />
          {errors.commentContent && (
            <span className=" block mt-1 mb-3 text-sm  text-red-500">
              {` * ${errors.commentContent?.message}`}
            </span>
          )}
          {expandedForm && (
            <footer className="flex justify-between items-center mt-3">
              <div className="h-12 min-w-[3rem] block bg-emerald-400 rounded-full"></div>

              <div className="flex gap-5">
                <button
                  onClick={toggleExpandedForm}
                  className="text-gray-700 hover:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white font-medium px-4 py-2 rounded-2xl hover:bg-emerald-300 flex items-center justify-center"
                >
                  Create Post
                </button>
              </div>
            </footer>
          )}
        </form>
      </div>
    </section>
  );
};

export default CommentForm;
