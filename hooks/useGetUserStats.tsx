import { useQuery } from "react-query";
import getUserStats from "../frontend - lib/axiosCalls/getUserStats";

const useGetUserStats = () => {
  const { isLoading, data } = useQuery(["userStats"], () => getUserStats());

  return {
    isLoading,
    data,
  };
};

export default useGetUserStats;
