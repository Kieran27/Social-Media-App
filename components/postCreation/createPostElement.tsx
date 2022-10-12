import useToggle from "../../hooks/useToggle";

const CreatePostElement = () => {
  const { isToggled, toggle } = useToggle();
  return (
    <div
      className="flex items-center w-full px-5 py-3 mb-3 border-y gap-4"
      onClick={toggle}
    >
      <div className="h-12 w-12 bg-emerald-200 rounded-full"></div>
      <div className="flex-grow bg-gray-100 py-3 px-5 rounded-2xl text-gray-600 cursor-pointer hover:bg-gray-200">
        What do you want to talk about today?
      </div>
    </div>
  );
};

export default CreatePostElement;
