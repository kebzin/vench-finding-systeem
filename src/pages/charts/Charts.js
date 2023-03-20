import { Box, useTheme } from "@mui/material";
import React from "react";
import { Header, LineChartAdmin } from "../../components";
import { tokens } from "../../theme";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Charts = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  return (
    <Box>
      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title={"Charts"} />
        </Box>
        {/* line chart */}

        <Box sx={{ background: color.primary[400] }}>
          <LineChartAdmin />
        </Box>
        {/* piechart  */}
        {/* <BarChart /> */}
        <Box
          sx={{ background: color.primary[400], mt: 2, height: "auto", pb: 2 }}
        >
          <PieChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Charts;
