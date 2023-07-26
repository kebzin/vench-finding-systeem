import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Sidebar, Topbar } from "./global";
import { Login, Welcome, Register } from "./pages/authentication";
import { PopUpMessage } from "./components";

import {
  Dashboard,
  Pricing,
  ManageUser,
  Notification,
  UserProfile,
  ForgetPassword,
  Transaction,
  TransactionView,
  Charts,
  Wanted,
  Payment,
} from "./pages";
import { useStateContext } from "./context/Contex";
import RequirAuth from "./components/RequirAuth";
import PersistLogin from "./components/PersistLogin";
import DialogBox from "./components/DialogBox";
import NotFound from "./components/NotFound";
import Settings from "./pages/settings/Settings";
import Category from "./pages/settings/Category";
import Bonus from "./pages/settings/Bonus";
import { useAuthContext } from "./context/AuthContex";
import { decryptData } from "./global/EncriptData";
import { isTokenExpired } from "./hooks/jwtExpired";
import ManageTellers from "./pages/tellers/Tellers";
import SingleTeller from "./pages/tellers/SingleTeller";
import Banks from "./pages/settings/Banks";
import PoliceStation from "./pages/settings/PoliceStation";

function App() {
  const { setUser } = useAuthContext();
  const { isSidebar, istopbar, OpenDialog, toggleDelete } = useStateContext();
  const [theme, colorMode] = useMode();

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
            console.log("access token espired");
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            {isSidebar && <Sidebar />}
            {istopbar && <Topbar />}
            {toggleDelete && <DialogBox />}
            {OpenDialog && <PopUpMessage />}

            <Routes>
              {/* protected routh */}

              <Route element={<RequirAuth />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tellers" element={<ManageTellers />} />
                <Route path="/tellers/:id" element={<SingleTeller />} />

                <Route path="pricing" element={<Pricing />} />
                <Route path="/users" element={<ManageUser />} />
                <Route path="/notification/:id" element={<Notification />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/userprofile/:id" element={<UserProfile />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/setting" element={<Settings />}>
                  <Route path="bonus" element={<Bonus />} />
                  <Route path="category" element={<Category />} />
                  <Route path="stations" element={<PoliceStation />} />
                  <Route path="banks" element={<Banks />} />
                </Route>
                <Route path="/transaction/:id" element={<TransactionView />} />
                <Route path="/wanted" element={<Wanted />} />
                <Route path="/Charts" element={<Charts />} />
              </Route>

              <Route path="/welcom" element={<Welcome />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
