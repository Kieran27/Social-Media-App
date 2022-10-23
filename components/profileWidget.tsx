import {
  IoChatbubble,
  IoPeople,
  IoNewspaper,
  IoThumbsUpSharp,
} from "react-icons/io5";
import { IUserStats } from "../frontend - lib/interfaces";
import Link from "next/link";
import useGetUserStats from "../hooks/useGetUserStats";

const ProfileWidget = () => {
  // Custom hook to fetch user stats
  const { data, isLoading } = useGetUserStats();
  const userStats = data?.data;

  return (
    <aside className="hidden col-span-1 xl:block xl:col-span-3 bg-white shadow-xl py-8 px-5 rounded-2xl self-start sticky top-4">
      <div className="flex justify-center relative">
        <div className="h-24 w-24 bg-emerald-200 rounded-full z-10"></div>
        <div className="absolute inline-block border w-full bg-gray-300 h-[1px] top-2/4 z-0 "></div>
      </div>
      <div className="text-center mt-3">
        <h3 className="font-semibold text-2xl">
          {userStats?.userProfile.username}
        </h3>
        <Link href={userStats?.userProfile._id || "user"}>
          <a className="text-blue-600 underline">View Profile</a>
        </Link>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoPeople className="text-2xl" />
          </div>
          <span className="font-semibold">Friends</span>
        </div>
        <span className="font-medium text-2xl">
          {userStats?.userProfile?.friends.length}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoNewspaper className="text-2xl" />
          </div>
          <span className="font-semibold">Posts</span>
        </div>
        <span className="font-medium text-2xl">
          {userStats?.userPosts.length}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-emerald-200 rounded-full flex items-center justify-center">
            <IoChatbubble className="text-2xl" />
          </div>
          <span className="font-semibold">Comments</span>
        </div>
        <span className="font-medium text-2xl">
          {userStats?.userComments.length}
        </span>
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
    </aside>
  );
};

export default ProfileWidget;
