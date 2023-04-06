import { useAuthContext } from "../context/AuthContex";
import { makeRequest } from "./axious";

const useRefreshToken = () => {
  const { setUser } = useAuthContext();

  //  refreshing token
  const refresh = async () => {
    const response = await makeRequest.get("/auth/refresh");
    setUser((previouseState) => {
      return {
        ...previouseState,
        user: response.data.Officers,
        accessToken: response.data.accessToken,
      }; // taking the previouse state of the access token and replaceing withe the new access token given to us by our refresing routh
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
