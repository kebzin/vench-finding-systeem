import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";

const SidBar = () => {
  const theme = useTheme();
  const COLORS = tokens(theme.palette.mode);
  const [Iscollaps, setIsCollapss] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  <Box
    sx={{
      "& .pro-sidebar-inner": {
        background: `${COLORS.primary[400]}!important  `,
      },
      "& .pro-icon-wrapper": {
        background: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important",
      },
      "& . pro-inner-item:hover": {
        color: "#868dfb !important",
      },
      "& . pro-menu-item.active": {
        color: "#6870fa !important",
      },
    }}
  ></Box>;
};

export default SidBar;
