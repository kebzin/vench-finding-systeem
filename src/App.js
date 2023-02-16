import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Sidebar, Topbar } from "./global";
import { Login, Welcome, Register } from "./pages/authentication";
import { SideBar } from "./components";
import { Dashboard, Pricing } from "./pages";

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
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="pricing" element={<Pricing />} />

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
