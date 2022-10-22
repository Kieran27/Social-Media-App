import useCreateComment from "../../hooks/useCreateComment";
import { replySchema } from "../../frontend - lib/yupSchemas";
import { useAuth } from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { IComment } from "../../frontend - lib/interfaces";
import {} from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { ClipLoader } from "react-spinners";

type TProps = {
  commentId: string;
  postId: string;
};

const ReplyForm = ({ commentId, postId }: TProps) => {
  // React hook form with yup resolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IComment>({
    resolver: yupResolver(replySchema),
  });

  const { user } = useAuth();
  const { isToggled, toggle } = useToggle();
  // Hook for mutation
  const { isLoading, mutate } = useCreateComment();

  // Component functions
  const onSubmit: SubmitHandler<IComment> = (replyData) => {
    const { content } = replyData;
    // Mutate data to include comment Id
    const mutatedData = {
      content,
      userId: user?.id,
      postId,
      commentId,
    };
    mutate(mutatedData);
  };

  return (
    <div className="mt-0 mb-3">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("content")}
            onFocus={toggle}
            className="bg-gray-100 px-2 py-1 w-full focus:outline-gray-400"
            type="text"
            placeholder="Write a reply..."
          />
        </div>
        {errors.content && (
          <div className="flex justify-end mt-1">
            <span className="text-red-500">
              {`* ${errors.content?.message}`}
            </span>
          </div>
        )}
        {isToggled && (
          <div className="flex justify-end mt-2">
            <button className="text-white bg-emerald-600 px-3" type="submit">
              Reply
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReplyForm;
