import {
  IoChatbubble,
  IoPeople,
  IoNewspaper,
  IoThumbsUpSharp,
} from "react-icons/io5";

const ProfileWidget = () => {
  return (
    <div className="col-span-3 bg-white shadow-xl py-8 px-5 rounded-2xl">
      <div className="flex justify-center relative">
        <div className="h-24 w-24 bg-emerald-200 rounded-full z-10"></div>
        <div className="absolute inline-block border w-full bg-gray-300 h-[1px] top-2/4 z-0 "></div>
      </div>
      <div className="text-center mt-3">
        <h3 className="font-semibold text-2xl"> Profile User </h3>
        <a href="" className="text-blue-600 underline">
          View Profile
        </a>
      </div>
      <h4 className="text-center mt-3">User Stats</h4>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoPeople className="text-2xl" />
          </div>
          <span className="font-semibold">Friends</span>
        </div>
        <span className="font-medium text-2xl">0</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoNewspaper className="text-2xl" />
          </div>
          <span className="font-semibold">Posts</span>
        </div>
        <span className="font-medium text-2xl">0</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoChatbubble className="text-2xl" />
          </div>
          <span className="font-semibold">Comments</span>
        </div>
        <span className="font-medium text-2xl">0</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoThumbsUpSharp className="text-2xl" />
          </div>
          <span className="font-semibold">Likes</span>
        </div>
        <span className="font-medium text-2xl">0</span>
      </div>
    </div>
  );
};

export default ProfileWidget;
