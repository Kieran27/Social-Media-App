import useDeleteComment from "../../hooks/useDeleteComment";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

type TProps = {
  toggle: () => void;
  postId: string;
  commentId: string;
};

const DeleteCommentModal = ({ toggle, postId, commentId }: TProps) => {
  // Custom hook for mutation
  const { isLoading, mutate } = useDeleteComment(postId);

  // Component Functions
  const handleDeleteComment = () => {
    mutate(commentId);
  };

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 px-5 mx-auto max-w-xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-5 py-5">
            <div className="flex justify-center relative">
              <h5 className="text-2xl font-semibold">Delete Comment?</h5>
            </div>
            <div className="mt-4 relative text-center max-w-md mx-auto">
              <p>
                Deleting Comment will remove comment entirely and all subsequent
                comments that encapsulate it. Are you sure?
              </p>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={toggle}
                type="button"
                className="text-gray-700 hover:text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteComment}
                type="submit"
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-2xl hover:bg-red-300 flex items-center justify-center"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <Toaster />
    </>
  );
};

export default DeleteCommentModal;
