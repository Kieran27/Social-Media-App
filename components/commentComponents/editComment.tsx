import { IComment } from "../../frontend - lib/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { updatedCommentSchema } from "../../frontend - lib/yupSchemas";
import { TCommentUpdate } from "../../frontend - lib/types";
import useUpdateComment from "../../hooks/useUpdateComment";
import { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { yupResolver } from "@hookform/resolvers/yup";

type TProps = {
  replyData: IComment;
  toggleEdit: () => void;
};

const EditComment = ({ replyData, toggleEdit }: TProps) => {
  // Custom hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommentUpdate>({
    defaultValues: {
      updatedCommentContent: replyData.content,
    },
    resolver: yupResolver(updatedCommentSchema),
  });

  // Custom hook for mutation
  const { isLoading, mutate } = useUpdateComment();

  // Component functions
  const onSubmit: SubmitHandler<TCommentUpdate> = (data) => {
    const { updatedCommentContent } = data;
    // Mutate data for mutation function
    const mutatedData = {
      updatedCommentContent,
      postId: replyData.postId,
      commentId: replyData._id,
    };
    mutate(mutatedData);
  };
  return (
    <>
      <div className="flex-grow bg-gray-100 rounded-3xl px-5 py-4 text-sm outline outline-1 outline-gray-500">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("updatedCommentContent")}
            className="bg-inherit w-full focus:outline-none"
            type="text"
          />
          <footer className="flex justify-end items-center">
            <div className="flex gap-5">
              <button
                onClick={toggleEdit}
                type="button"
                className="text-gray-700 hover:text-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 text-white font-medium px-4 py-1 rounded-2xl hover:bg-emerald-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <ClipLoader color={"#fff"} loading={true} size={20} />
                ) : (
                  "Edit"
                )}
              </button>
            </div>
          </footer>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default EditComment;
