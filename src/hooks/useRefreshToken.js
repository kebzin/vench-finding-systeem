import { useAuthContext } from "../context/AuthContex";
import { makeRequest } from "./axious";

const useRefreshToken = () => {
  const { setUser } = useAuthContext();

  //  refreshing token
  const refresh = async () => {
    const response = await makeRequest.get("/auth/refresh");
    setUser((previouseState) => {
      // taking the previouse state
      // console.log("refreshin1", JSON.stringify(previouseState));
      // console.log("refresh", response.data.accessToken);
      return { ...previouseState, accessToken: response.data.accessToken }; // taking the previouse state of the access token and replaceing withe the new access token given to us by our refresing routh
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
