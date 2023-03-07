import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";

const RequirAuth = () => {
  const { setUser, user } = useAuthContext();
  const Location = useLocation();

  return user?.Officers ? ( // if the state doesn't  have a user redirect them tothe login page
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: Location }} replace />
  );
};

export default RequirAuth;
