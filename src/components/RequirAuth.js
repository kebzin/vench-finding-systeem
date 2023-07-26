import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";
import { useEffect, useState } from "react";
import { decryptData } from "../global/EncriptData";
import { isTokenExpired } from "../hooks/jwtExpired";

const RequirAuth = () => {
  const { user, setUser } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [checkedLocalStorage, setCheckedLocalStorage] = useState(false);

  useEffect(() => {
    if (!checkedLocalStorage) {
      setCheckedLocalStorage(true);
      const encryptedUserData = localStorage.getItem("user");

      if (encryptedUserData) {
        // Decrypt the user data from local storage
        try {
          // Parse the encrypted data as JSON before decrypting
          const decryptedUserData = decryptData(
            encryptedUserData,
            "secret_key"
          );
          const parsedEncryptedData = JSON.parse(decryptedUserData);

          const accessToken = parsedEncryptedData?.accessToken;

          if (!isTokenExpired(accessToken)) {
            // Access token is not expired, set the decrypted user data in the application state
            setUser(parsedEncryptedData, accessToken);
          } else {
            // Access token is expired, redirect to login
            navigate("/login");
          }
        } catch (error) {
          // Error decrypting data, redirect to login
          navigate("/login");
        }
      } else {
        // No user data found in local storage, redirect to login
        navigate("/login");
      }
    }
  }, [checkedLocalStorage, navigate, setUser]);
  return user?.Officers === null || undefined ? ( // If the state doesn't have a user redirect them to the login page
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequirAuth;
