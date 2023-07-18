import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const { isSidebar, istopbar } = useStateContext();

  const [theme, colorMode] = useMode();

  const { OpenDialog, toggleDelete } = useStateContext();

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
                <Route path="pricing" element={<Pricing />} />
                <Route path="/users" element={<ManageUser />} />
                <Route path="/notification/:id" element={<Notification />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/userprofile/:id" element={<UserProfile />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/setting" element={<Settings />}>
                  <Route path="bonus" element={<Bonus />} />
                  <Route path="category" element={<Category />} />
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
