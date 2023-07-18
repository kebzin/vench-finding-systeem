import { Box, useTheme, Typography, IconButton, Avatar } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import React, { useEffect, useState } from "react";
import { Dashboard } from "@mui/icons-material";
import { tokens } from "../theme";
import { color } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3Icon from "@mui/icons-material/Person3";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import { hover } from "@testing-library/user-event/dist/hover";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useStateContext } from "../context/Contex";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  const { user } = useAuthContext();
  const { sidebarWidth } = useStateContext();

  const userProfile = "";

  const Menues = [
    {
      name: "Dashboard",
      link: "/",
      icons: <DashboardIcon />,
    },
    {
      name: "Manage Users",
      link: "/users",
      icons: <Person3Icon />,
      admin: user?.Officers?.role,
    },
    {
      name: "Transactions",
      link: "/transaction",
      icons: <ReceiptLongIcon />,
    },
    {
      name: "Pricing Amounts",
      link: "/pricing",
      icons: <PaymentsIcon />,
    },
    {
      name: "Data Analysis",
      link: "/Charts",
      icons: <BarChartIcon />,
      admin: user?.Officers?.role,
    },
    {
      name: "Wanted  ",
      link: "/wanted",
      icons: <DirectionsRunIcon sx={{ fontSize: 30 }} />,
    },
  ];

  return (
    <Box
      className="Sidebar"
      sx={{
        background: colors.primary[400],
        background: colors.primary[400],
        minHeight: "100vh",
        height: "auto",
        width: sidebarWidth,
        position: "fixed",

        objectFit: "contain",
        transition: "all 1s",
        overflow: "auto",
      }}
    >
      <Box
        className=""
        sx={{
          p: 1,
        }}
      >
        <Box>
          <Box
            className=""
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {userProfile === "" ? (
              <Avatar sizes="300px" sx={{ bgcolor: colors.greenAccent[600] }}>
                {user?.Officers?.firstName?.charAt(0) +
                  "" +
                  user?.Officers?.lastName?.charAt(0)}
              </Avatar>
            ) : (
              <Avatar />
            )}
          </Box>
          <Typography
            variant="h5"
            color={colors.grey[100]}
            sx={{ textAlign: "center" }}
          >
            {user?.Officers?.firstName + " " + user?.Officers?.lastName}
          </Typography>
        </Box>

        <Box sx={{ mt: 15 }}>
          <Box>
            {Menues.map((item, iindex) =>
              item.admin === "Employee" ? null : (
                <Box
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  sx={{
                    mt: 3,
                    "&:hover": { background: colors.greenAccent[700] },
                  }}
                  onClick={() =>
                    Navigate(item.admin === "Employee" ? null : item.link)
                  }
                >
                  <IconButton
                    sx={{ cursor: "pointer", color: colors.greenAccent[500] }}
                  >
                    {item.admin === "Employee" ? null : item.icons}
                  </IconButton>
                  <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    className="DetailText"
                  >
                    {item.admin === "Employee" ? null : item.name}
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
