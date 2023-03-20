// this fill alow us to persist our login. this means that even we refresh our page we wil be still be log in

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  // state
  const { user, setUser } = useAuthContext();
  const [isloading, setLoading] = useState(true);
  const refresh = useRefreshToken();

  //effects

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log("refreshing , ", refresh);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    !user?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log("loading", isloading);

    console.log(`aT: ${JSON.stringify(user?.accessToken)}`);
  });

  return <>{isloading ? <p>loading....</p> : <Outlet />}</>;
};

export default PersistLogin;
