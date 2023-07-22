import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";
import { makeRequest } from "./axious";
import { useState } from "react";

export const useLogout = () => {
  const { setUser } = useAuthContext();
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const logout = async () => {
    try {
      const response = await makeRequest.post(
        "/auth/logout",

        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.clear();
      setUser(null);
      Navigate("/login");

      // Encrypt and store the user data in the local storage
    } catch (error) {
      if (error.response) {
        // Server responded with an error message
        const statusCode = error.response?.status;
        if (statusCode === 500) {
          setError(
            "Internal Server Error: Something went wrong on the server."
          );
        } else {
          setError("Unknown Error: An unknown error occurred.");
        }
      } else if (error.request) {
        // Network error or no server response
        setError("Network Error: Unable to connect to the server.");
      } else {
        // Other errors (e.g., code error)
        setError("Error: Something went wrong.");
      }
    }
  };

  // remove user from local storage

  return { logout };
};
