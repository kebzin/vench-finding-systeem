import { useTheme } from "@emotion/react";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Header, MakeFine, StatBox } from "../../components";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

const Dashboard = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [status, setStatus] = useState("client");
  const [toggleAdd, setToggleAdd] = useState(true);
  const ToggleAddFunction = (event) => {
    setToggleAdd((previouseState) => !previouseState);
  };
  const login = true;
  const loginstatus = "client";
  return (
    <React.Fragment>
      {/* dashboard content */}

      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        <Box
          className="transition"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(325px, 1fr));"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            backgroundColor={color.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle={loginstatus === "admin" ? "Fines" : "Fines I Made"}
              progress="0.75"
              increase="+14%"
              complete={"+83"}
              date={" 2 months ago"}
              icon={
                <TrafficIcon
                  sx={{ color: color.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={color.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: color.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>

      <Box>
        {/* add botten */}
        {toggleAdd && <MakeFine />}
        {status === "client" ? (
          <Box sx={addButtonContainer} onClick={() => ToggleAddFunction()}>
            <IconButton sx={{ p: 3 }}>
              <AddCircleRoundedIcon sx={{ fontSize: 44 }} />
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
