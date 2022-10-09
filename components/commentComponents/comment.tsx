import {
  IoTrashOutline,
  IoPencilOutline,
  IoThumbsUpOutline,
} from "react-icons/io5";

const Comment = () => {
  return (
    <div className="flex flex-col md:max-w-2xl md:mx-auto">
      <div className="flex gap-6 items-center">
        <div className="h-12 min-w-[3rem] block bg-emerald-400 rounded-full"></div>
        <div className="flex-grow bg-gray-100 rounded-3xl px-5 py-4">
          <header className="flex justify-between mb-2">
            <p className="text-sm font-semibold tracking-wide">
              Author Name |
              <span className="text-gray-400 font-medium tracking-normal ml-2">
                Date
              </span>
            </p>
            <div className="flex gap-4">
              <button className="hover:text-red-500">
                <IoTrashOutline />
              </button>
              <button className="hover:text-emerald-500">
                <IoPencilOutline />
              </button>
            </div>
          </header>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Doloremque, ullam rem. Sequi ad quos doloribus dolor ipsum aliquam
            voluptatibus veniam, quod odio, quo, necessitatibus voluptatem?
          </p>
        </div>
        <div className="flex flex-col">
          <button className="text-xl">
            <IoThumbsUpOutline />
          </button>
          <span className="text-center text-xl">0</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
