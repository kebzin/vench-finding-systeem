import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContex = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload };

//     case "LOGOUT":
//       return { user: null };

//     default:
//       return state;
//   }
// };
export const AuthConteProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("access token", user?.accessToken);
  // login functionn

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setUser(user);
  //   }
  // }, []);

  console.log("auth contex state", user);
  return (
    <AuthContex.Provider value={{ user, setUser }}>
      {children}
    </AuthContex.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContex);
