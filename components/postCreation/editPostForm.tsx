import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPostSchema } from "../../frontend - lib/yupSchemas";
import { TPostUpdate } from "../../frontend - lib/types";
import { useAuth } from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { IPost } from "../../frontend - lib/interfaces";
import useIndividualPost from "../../hooks/useIndividualPost";

interface IProps {
  postData: IPost;
  postId: string;
  toggleEditForm: () => void;
}

const EditPostForm = ({ postData, postId, toggleEditForm }: IProps) => {
  // Custom hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostUpdate>({
    defaultValues: {
      updatedPostContent: postData.content,
    },
    resolver: yupResolver(editPostSchema),
  });
  const { user } = useAuth();
  const { editPostMutation } = useIndividualPost(postId, user?.id);

  // Component functions
  const onSubmit: SubmitHandler<TPostUpdate> = (data) => {
    const { updatedPostContent } = data;
    editPostMutation.mutate(updatedPostContent);
  };

  return (
    <section className="flex flex-col border-b">
      <div className="px-5 py-3">
        <form onSubmit={handleSubmit(onSubmit)} id="editPost">
          <textarea
            {...register("updatedPostContent")}
            className="bg-gray-100 resize-none w-full px-5 py-3 rounded-3xl transition-[rows] focus:outline-gray-400"
            placeholder="Update post..."
          />
          {errors.updatedPostContent && (
            <span className=" block mt-1 mb-3 text-sm  text-red-500">
              {` * ${errors.updatedPostContent?.message}`}
            </span>
          )}

          <footer className="flex justify-end items-center mt-3">
            <div className="flex gap-5">
              <button
                className="text-gray-700 hover:text-gray-400"
                onClick={toggleEditForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="editPost"
                className="bg-emerald-500 text-white font-medium px-4 py-2 rounded-2xl hover:bg-emerald-300 flex items-center justify-center"
              >
                Edit Post
              </button>
            </div>
          </footer>
        </form>
      </div>
      <Toaster />
    </section>
  );
};

export default EditPostForm;
