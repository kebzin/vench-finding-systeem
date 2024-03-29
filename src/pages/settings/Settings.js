import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { useStateContext } from "../../context/Contex";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const { sidebarWidth } = useStateContext();

  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "15px;",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Settings"
          subtitle="Configuring setting for other users"
        />
      </Box>
      {/* setting content */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"bonus"}
          style={{ color: color.primary[500], textDecoration: "none" }}
        >
          <Typography sx={{ color: color.primary[200] }}> Bonus</Typography>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"category"}
          style={{ color: color.primary[500], textDecoration: "none" }}
        >
          <Typography sx={{ color: color.primary[200] }}> Category</Typography>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"stations"}
          style={{ color: color.primary[500], textDecoration: "none" }}
        >
          <Typography sx={{ color: color.primary[200] }}>
            Police Stations
          </Typography>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"banks"}
          style={{ color: color.primary[500], textDecoration: "none" }}
        >
          <Typography sx={{ color: color.primary[200] }}> Banks</Typography>
        </NavLink>
      </Box>
      <Outlet />
    </Box>
  );
};
export default Settings;
