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

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Dashboard");
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user === null) return Navigate("/login");
  });
  // sidebar item clicked

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
      name: "Charts",
      link: "/Charts",
      icons: <BarChartIcon />,
    },
  ];

  return (
    <Box
      className="Sidebar"
      sx={{
        background: colors.primary[400],
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
            }}
          >
            {userProfile === "" ? (
              <Avatar sizes="300px" sx={{ bgcolor: colors.greenAccent[600] }}>
                {/* {user.Officers.firstName.charAt(0) +
                  "" +
                  user.Officers.lastName.charAt(0)} */}
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
            {/* {user.Officers.firstName + " " + user.Officers.lastName} */}
          </Typography>
        </Box>

        <Box sx={{ mt: 15 }}>
          <Box>
            {Menues.map((item, iindex) => (
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                sx={{
                  mt: 3,
                  "&:hover": { background: colors.greenAccent[700] },
                }}
                onClick={() => Navigate(item.link)}
              >
                <IconButton
                  sx={{ cursor: "pointer", color: colors.greenAccent[500] }}
                >
                  {item.icons}
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ cursor: "pointer" }}
                  className="DetailText"
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
