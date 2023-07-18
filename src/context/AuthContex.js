import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContex = createContext();
export const AuthConteProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log("access token", user?.accessToken);

  // console.log("auth contex state", user);
  return (
    <AuthContex.Provider value={{ user, setUser }}>
      {children}
    </AuthContex.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContex);
