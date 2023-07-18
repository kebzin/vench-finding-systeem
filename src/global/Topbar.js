import React, { useEffect } from "react";
import {
  Badge,
  Box,
  colors,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import { InputBase } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import Person4Icon from "@mui/icons-material/Person4";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import MenuIcon from "@mui/icons-material/Menu";
import { useStateContext } from "../context/Contex";
import { MyProfile, Notification } from "../components";
import { useNavigate } from "react-router-dom";

const Topbar = ({}) => {
  const theme = useTheme();
  const {
    isClicked,
    HandleClick,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
  } = useStateContext();

  const Navigation = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const color = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          p: 2,
          marginLeft: screenSize <= 754 ? "100px" : "180px",
          transition: "all 1s",
        }}
        // display={"flex"}
        // justifyContent="space-between"
        // flexWrap={"wrap"}
        // p={2}
      >
        {/* search bar */}
        <Box borderRadius="3px" display="flex" className="inputBass">
          <IconButton type="button" sx={{ p: 1 }}>
            <MenuIcon
              style={{ width: 40, height: 40 }}
              onClick={() => setActiveMenu((prev) => !prev)}
            />
          </IconButton>

          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              padding: 1,
              background: color.primary[400],

              borderRadius: 3,
            }}
            placeholder="Search"
          />
        </Box>

        <Box sx={{ alignSelf: "flex-end" }}>
          {/* icons button */}
          <IconButton
            type="button"
            sx={{ p: 1 }}
            onClick={() => HandleClick("notification")}
          >
            {/* <NotificationsIcon /> */}
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>

          <IconButton type="button" sx={{ p: 1 }}>
            <SettingsIcon onClick={() => Navigation("/setting")} />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: 1 }}
            onClick={() => HandleClick("profile")}
          >
            <Person4Icon />
          </IconButton>
        </Box>

        {isClicked.notification && <Notification />}
        {isClicked.profile && <MyProfile />}
      </Box>
    </React.Fragment>
  );
};

export default Topbar;
