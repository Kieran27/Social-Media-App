import Comment from "./comment";
import DeleteCommentModal from "./deleteCommentModal";
import useToggle from "../../hooks/useToggle";
import { IComment } from "../../frontend - lib/interfaces";
import { useState } from "react";

type TProps = {
  commentsData: IComment[];
  postId: string;
};

const CommentsContainer = ({ commentsData, postId }: TProps) => {
  const [commentId, setCommentId] = useState("");
  // Custom hook to handle deleteComment Modal display
  const { isToggled, toggle } = useToggle();
  return (
    <>
      {commentsData?.map((comment) => {
        return (
          <Comment
            key={comment._id}
            commentData={comment}
            toggle={toggle}
            setCommentId={setCommentId}
          />
        );
      })}

      {isToggled && (
        <DeleteCommentModal
          toggle={toggle}
          postId={postId}
          commentId={commentId}
        />
      )}
    </>
  );
};

export default CommentsContainer;
