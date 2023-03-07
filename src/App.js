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
} from "./pages";
import { useStateContext } from "./context/Contex";
import { useAuthContext } from "./context/AuthContex";
import RequirAuth from "./components/RequirAuth";
import PersistLogin from "./components/PersistLogin";
import Transaction from "./pages/Dashboard/transaction/Transaction";
import TransactionView from "./pages/Dashboard/transaction/transactionView";

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
  const { OpenDialog } = useStateContext();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            {OpenDialog && <PopUpMessage />}
            {isSidebar && <Sidebar />}
            {istopbar && <Topbar />}

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
                </Route>
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
