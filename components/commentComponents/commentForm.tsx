import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TCommentCreate } from "../../frontend - lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCommentSchema } from "../../frontend - lib/yupSchemas";
import { useAuth } from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
import useCreateComment from "../../hooks/useCreateComment";

type TProps = {
  postId: string;
};

const CommentForm = ({ postId }: TProps) => {
  const [expandedForm, setExpandedForm] = useState(false);

  // Custom hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentCreate>({
    resolver: yupResolver(createCommentSchema),
  });
  const { user } = useAuth();
  const { isLoading, mutate } = useCreateComment();

  // Component functions
  const onSubmit: SubmitHandler<TCommentCreate> = (data) => {
    const { commentContent } = data;
    mutate({ content: commentContent, userId: user?.id, postId: postId });
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
              <div className=" h-8 w-8 sm:h-12 sm:min-w-[3rem] block bg-emerald-400 rounded-full"></div>

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
                  Create Comment
                </button>
              </div>
            </footer>
          )}
        </form>
      </div>
      <Toaster />
    </section>
  );
};

export default CommentForm;
