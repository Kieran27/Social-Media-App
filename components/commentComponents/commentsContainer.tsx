import Comment from "./comment";
import { IComment } from "../../frontend - lib/interfaces";

type TProps = {
  commentsData: IComment[];
};

const CommentsContainer = ({ commentsData }: TProps) => {
  return (
    <div className="flex flex-col gap-5 transition-all">
      {commentsData?.map((comment) => {
        return <Comment key={comment._id} commentData={comment} />;
      })}
    </div>
  );
};

export default CommentsContainer;
