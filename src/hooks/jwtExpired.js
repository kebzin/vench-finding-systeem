import jwtDecode from "jwt-decode";

// Function to check if the access token is expired
export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert current time to seconds

    // Check if the expiration date is greater than the current time
    if (decodedToken.exp > currentTime) {
      return false; // Token is not expired
    } else {
      return true; // Token is expired
    }
  } catch (error) {
    // If there's an error decoding the token, consider it as expired
    return true;
  }
};
