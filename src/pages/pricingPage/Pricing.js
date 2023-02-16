import { useTheme } from "@emotion/react";
import { Box, Button, colors, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { CrimePrcing, Header } from "../../components";
import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DeleteIcon from "@mui/icons-material/Delete";
import BackupIcon from "@mui/icons-material/Backup";
import { KeyboardReturn } from "@mui/icons-material";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

const pricingDummData = [
  {
    name: "Wrong Paking",
    price: 200,
    icon: <DirectionsCarFilledIcon sx={{ fontSize: 100 }} />,
  },
  {
    name: "Wrong Paking",
    price: 250,
    icon: <FireTruckIcon sx={{ fontSize: 100 }} />,
  },
  {
    name: "Wrong Paking",
    price: 50,
    icon: <DirectionsBikeIcon sx={{ fontSize: 100 }} />,
  },
  {
    name: "Wrong Paking",
    price: 100,
    icon: <TwoWheelerIcon sx={{ fontSize: 100 }} />,
  },
  {
    name: "Wrong Paking",
    price: 300,
    icon: <DirectionsBusIcon sx={{ fontSize: 100 }} />,
  },
];

//

const Pricing = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const status = "admin";
  const [toggleAdd, setToggleAdd] = useState(true);
  const [CrimeName, setCrimeName] = useState("");
  const [Category, setCategory] = useState("");
  const [price, setprice] = useState("");
  const ToggleAddFunction = (event) => {
    setToggleAdd((previouseState) => !previouseState);
  };

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
          gridTemplateColumns="repeat(auto-fit, minmax(310px, 1fr));"
          gridAutoRows="190px"
          gap="20px"
        >
          {/* ROW 1 */}

          {pricingDummData.map((item, index) => (
            <Box
              backgroundColor={color.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="auto"
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyItems: "center",
                  justifyContent: "space-between",
                  m: "0 20px",
                }}
              >
                <Box
                  sx={{
                    objectFit: "contain",
                  }}
                >
                  <IconButton
                    sx={{ fontSize: 100, color: color.greenAccent[400] }}
                  >
                    {item.icon}
                  </IconButton>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                  <Typography>
                    priceng
                    <Typography
                      variant="h1"
                      sx={{ fontSize: 15, color: color.greenAccent[400] }}
                    >
                      GMD{item.price}
                    </Typography>
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography>Category</Typography>
                  <Typography
                    sx={{ textAlign: "center", color: color.greenAccent[400] }}
                  >
                    {"cars"}
                  </Typography>
                  {status === "admin" ? (
                    <Button
                      sx={{
                        mt: 2,
                        color: color.redAccent[400],
                      }}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  ) : null}
                  {status === "admin" ? (
                    <Button
                      sx={{
                        mt: 1,
                        color: color.greenAccent[400],
                      }}
                      variant="outlined"
                      startIcon={<BackupIcon />}
                    >
                      update
                    </Button>
                  ) : null}
                </Box>
              </Box>
            </Box>
          ))}
          <Box
            backgroundColor={color.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Box>
        </Box>
      </Box>
      <Box>
        {/* add botten */}
        {toggleAdd && <CrimePrcing setToggleAdd={setToggleAdd} />}
        {status === "admin" ? (
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

export default Pricing;
