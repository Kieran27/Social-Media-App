const getTokenFromStorage = () => {
  const userToken: string | null = localStorage.getItem("token");
  if (userToken) {
    return JSON.parse(userToken);
  }
  return false;
};

export default getTokenFromStorage;
