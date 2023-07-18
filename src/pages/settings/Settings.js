import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  return (
    <Box className="Header">
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
      </Box>
      <Outlet />
    </Box>
  );
};
export default Settings;
