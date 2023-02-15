import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

import { Login, Welcome, Register } from "./pages/authentication";
import { SideBar } from "./components";
import { Topbar } from "./global";
import { Dashboard } from "./pages";

function App() {
  const [login, setLogin] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    if (login === false) {
      return Navigate("/login");
    }
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setLogin(true);
  //   }
  // }, []);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ProSidebarProvider>
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </ProSidebarProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
