import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import { Header } from "../../components";
import { tokens } from "../../theme";

const Pricing = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  return (
    <React.Fragment>
      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Pricing Page"
            subtitle="This page contain all the price about each crime, or violation of the rule. Incase if you are new to the system you can visisted this page   frequently to see the liste of fine prices "
          />
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
          ></Box>
          <Box
            backgroundColor={color.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Pricing;
