import { useNavigate } from "react-router";
import { decryptData } from "../global/EncriptData";
import { useAuthContext } from "../context/AuthContex";

/**
 * Function to check local storage for user data, decrypt it, and set the user in the application state.
 * If the user data is valid and not expired, set the user in the application state.
 * If the user data is not available or the access token is expired, redirect to the login page.
 * @returns {boolean} - True if the user is set in the application state successfully, false otherwise.
 */
const CheckLocalStorageAndSetUser = () => {
  const Navigate = useNavigate();
  const { setUser } = useAuthContext();
  const encryptedUserData = localStorage.getItem("user");

  if (encryptedUserData) {
    // Decrypt the user data from local storage
    try {
      const decryptedUserData = decryptData(encryptedUserData, "secret_key");
      const currentTime = new Date().getTime() / 1000; // Get current time in seconds
      const accessTokenExpiration = decryptedUserData?.accessTokenExpiration;

      if (!accessTokenExpiration || accessTokenExpiration < currentTime) {
        // Access token is expired, redirect to login
        Navigate("/login");
        return false;
      }

      // Set the decrypted user data in the application state
      setUser(decryptedUserData);
      return true;
    } catch (error) {
      // Error decrypting data, redirect to login
      Navigate("/login");
      return false;
    }
  } else {
    // No user data found in local storage, redirect to login
    Navigate("/login");
    return false;
  }
};

export default CheckLocalStorageAndSetUser;
