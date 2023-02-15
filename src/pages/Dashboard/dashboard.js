import { useTheme } from "@emotion/react";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Sidebar, Topbar } from "../../global";
import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Header, MakeFine, StatBox } from "../../components";
import EmailIcon from "@mui/icons-material/Email";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [status, setStatus] = useState("client");
  const [toggleAdd, setToggleAdd] = useState(true);
  const ToggleAddFunction = (event) => {
    setToggleAdd((previouseState) => !previouseState);
  };
  return (
    <React.Fragment>
      <Box>
        <Box>
          <Sidebar />
          <Topbar />
        </Box>
      </Box>

      {/* dashboard content */}
      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
      </Box>

      {/* GRID & CHARTS */}

      <Box>
        {/* add botten */}
        {toggleAdd && <MakeFine />}
        {status === "client" ? (
          <Box sx={addButtonContainer} onClick={() => ToggleAddFunction()}>
            <IconButton sx={{ p: 3 }}>
              <AddCircleRoundedIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
