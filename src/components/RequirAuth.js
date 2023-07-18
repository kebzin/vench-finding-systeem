import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";
import { useEffect, useState } from "react";
import { decryptData } from "../global/EncriptData";

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
          // const currentTime = new Date().getTime() / 1000; // Get current time in seconds
          // const accessTokenExpiration =
          //   decryptedUserData?.accessTokenExpiration;

          const parsedEncryptedData = JSON.parse(decryptedUserData);

          const accessToken = parsedEncryptedData?.accessToken;

          // if (!accessTokenExpiration || accessTokenExpiration < currentTime) {
          //   // Access token is expired, redirect to login
          //   navigate("/login");
          // } else {
          //   // Set the decrypted user data in the application state
          //   setUser(decryptedUserData, accessToken);
          // }
          setUser(parsedEncryptedData, accessToken);
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
