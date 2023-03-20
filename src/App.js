import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Sidebar, Topbar } from "./global";
import { Login, Welcome, Register } from "./pages/authentication";
import { PopUpMessage, SideBar } from "./components";

import {
  Dashboard,
  Pricing,
  ManageUser,
  Notification,
  UserProfile,
  ForgetPassword,
  Transaction,
  TransactionView,
  Invoice,
  Charts,
} from "./pages";
import { useStateContext } from "./context/Contex";
import { useAuthContext } from "./context/AuthContex";
import RequirAuth from "./components/RequirAuth";
import PersistLogin from "./components/PersistLogin";
import DialogBox from "./components/DialogBox";
import NotFound from "./components/NotFound";

function App() {
  const { isSidebar, istopbar } = useStateContext();
  const [login, setLogin] = useState(true);
  const { setUser } = useAuthContext();
  const Navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setLogin(true);
  //   }
  // }, []);

  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  // const [istopbar, setTopbar] = useState(true);
  const { OpenDialog, toggleDelete } = useStateContext();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            {OpenDialog && <PopUpMessage />}
            {isSidebar && <Sidebar />}
            {istopbar && <Topbar />}
            {toggleDelete && <DialogBox />}

            <Routes>
              {/* protected routh */}
              <Route element={<PersistLogin />}>
                <Route element={<RequirAuth />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="/users" element={<ManageUser />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/userprofile" element={<UserProfile />} />
                  <Route path="/userprofile/:id" element={<UserProfile />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route
                    path="/transaction/:id"
                    element={<TransactionView />}
                  />
                  <Route path="/invoice/:id" element={<Invoice />} />
                  <Route path="/Charts" element={<Charts />} />
                </Route>
              </Route>

              <Route path="/welcom" element={<Welcome />} />
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
