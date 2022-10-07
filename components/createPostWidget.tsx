import { IoCreateOutline } from "react-icons/io5";

const CreatePostWidget = () => {
  return (
    <button
      aria-label="new post"
      className="h-12 w-12 rounded-full fixed bottom-0 right-0 flex items-center justify-center shadow-2xl mx-3 my-3 bg-white hover:bg-gray-200"
    >
      <IoCreateOutline className="text-2xl" />
    </button>
  );
};

export default CreatePostWidget;
