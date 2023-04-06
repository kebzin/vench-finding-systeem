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
import { StateContex, useStateContext } from "../context/Contex";
import { MyProfile, Notification } from "../components";

const Topbar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const { isClicked, HandleClick } = useStateContext();

  const color = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <React.Fragment>
      <Box
        className="TopBar"
        display={"flex"}
        justifyContent="space-between"
        flexWrap={"wrap"}
        p={2}
      >
        {/* search bar */}
        <Box borderRadius="3px" display="flex" className="inputBass">
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              background: color.primary[400],

              borderRadius: 3,
            }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchSharpIcon />
          </IconButton>
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
            <SettingsIcon />
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
