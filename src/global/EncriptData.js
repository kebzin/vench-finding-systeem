import CryptoJS from "crypto-js";

/**
 * Function to encrypt sensitive data using AES encryption.
 * @param {Object} data - The data to be encrypted (e.g., user object).
 * @returns {string} - The encrypted data in Base64 format.
 */
const encryptData = (data, secret) => {
  const secretKey = secret; // Replace with your own secret key
  const dataString = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();
  return encryptedData;
};

/**
 * Function to decrypt encrypted data using AES decryption.
 * @param {string} encryptedData - The encrypted data in Base64 format.
 * @returns {Object} - The decrypted data (e.g., user object).
 */
const decryptData = (encryptedData, secret_key) => {
  const secretKey = secret_key; // Replace with your own secret key
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decryptedData);
};

export { decryptData, encryptData };
