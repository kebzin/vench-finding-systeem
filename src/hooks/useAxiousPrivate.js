import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContex";
import { axiousePrive } from "./axious";
import useRefreshToken from "./useRefreshToken";

const useAxiousPrivate = () => {
  const { user } = useAuthContext();
  const refresh = useRefreshToken();
  // intersepters
  useEffect(() => {
    // request intersept
    const requestIntersept = axiousePrive.interceptors.request.use(
      (config) => {
        // if the authorization header does not exist then dont not try, its the first attempt
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responsesIntersept = axiousePrive.interceptors.response.use(
      // if the response is good return respond
      // otherwise return error handeler
      (response) => response,
      async (error) => {
        // if the token expired we will be in this async handeler
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiousePrive(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // clean up function
    return () => {
      axiousePrive.interceptors.response.eject(responsesIntersept);
      axiousePrive.interceptors.request.eject(requestIntersept);
    };
  }, [refresh, user]);
  return axiousePrive;
};

export default useAxiousPrivate;
