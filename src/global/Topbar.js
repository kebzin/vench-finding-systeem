import React from "react";
import { Box, colors, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import { InputBase } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import Person4Icon from "@mui/icons-material/Person4";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const Topbar = () => {
  const theme = useTheme();

  const color = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
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
        <IconButton type="button" sx={{ p: 1 }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <IconButton type="button" sx={{ p: 1 }}>
          <SettingsIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <Person4Icon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
