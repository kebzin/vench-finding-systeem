import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";

export const useLogout = () => {
  const { setUser } = useAuthContext();
  const Navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    Navigate("/login");
  };

  // remove user from local storage

  return { logout };
};
