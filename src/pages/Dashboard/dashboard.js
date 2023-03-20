import { useTheme } from "@emotion/react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Header, MakeFine, StatBox, LineChartAdmin } from "../../components";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useStateContext } from "../../context/Contex";
import { useAuthContext } from "../../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

// recent transaction .map
const recentTransaction = [{}, {}, {}, {}, {}];

const Dashboard = () => {
  const { setIsSidebar, setTopbar } = useStateContext();
  const { user } = useAuthContext();
  const Navigate = useNavigate();
  useEffect(() => {
    setTopbar(true);
    setIsSidebar(true);
    // const LoginUser = localStorage.getItem("user");
    // if (LoginUser === null || LoginUser === undefined)
    //   return Navigate("/login");
  }, []);

  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [status, setStatus] = useState("client");
  const [toggleAdd, setToggleAdd] = useState(false);

  // states
  const [dateValue, setDateValue] = useState();

  // functions
  const HandleDate = (event) => {
    setDateValue(event.target.value);
  };
  console.log("date ", dateValue);

  const ToggleAddFunction = (event) => {
    setToggleAdd((previouseState) => !previouseState);
  };
  console.log("user", user);
  const login = true;
  const loginstatus = "Administrator";
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
              subtitle={
                loginstatus === "Administrator"
                  ? "Total Fines"
                  : "Number of Fines I Made"
              }
              progress="0.7"
              increase="+14"
              complete={"+83"}
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
        <Box
          className="transition"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(325px, 1fr));"
          gridAutoRows="350px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            sx={{
              mt: 2,
              background: color.primary[400],
            }}
          >
            <LineChartAdmin />
          </Box>
          <Box
            // gridRow="span 1"
            backgroundColor={color.primary[400]}
            overflow="auto"
            sx={{
              mt: 2,
            }}
          >
            <Box
              //
              // borderBottom={`4px solid ${color.primary[500]}`}
              colors={color.grey[100]}
              sx={{
                position: "absolute",
                width: "inherit",
                p: 2,
                backgroundColor: color.primary[400],
              }}
              back
              p="15px"
            >
              <Typography color={color.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>

            {recentTransaction.map(() => (
              <Box
                // key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${color.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={color.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {"BJL 1414"}
                  </Typography>
                  <Typography color={color.grey[100]}>{"Kebba"}</Typography>
                </Box>
                <Box color={color.grey[100]}>{"2021-09-1"}</Box>
                <Box
                  backgroundColor={color.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  GMD{"500"}
                </Box>
              </Box>
            ))}
          </Box>

          {/* // top five people beetween date range */}
        </Box>
        <Box
          gridColumn="span 3"
          sx={{
            backgroundColor: color.primary[400],
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              p: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              Top Officers
            </Typography>

            <Box sx={{}}>
              <Typography sx={{ color: color.blueAccent[200], mb: 1 }}>
                Filter By year or Month
              </Typography>
              <DateTimePicker
                elabel="Filter Base on date"

                // value={value}
                // onChange={(newValue) => setValue(newValue)}
              />
              <LoadingButton
                size="larger"
                color="primary"
                // onClick={handleClick}
                // loading={loading}
                loadingPosition="end"
                variant="contained"
                style={{ backgroundColor: color.greenAccent[600] }}
              >
                <span style={{ padding: "10px" }}>Fetch</span>
              </LoadingButton>
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ pl: 2, textAlign: "center" }}>
              {" "}
              {`This  are the five top officers `}{" "}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {recentTransaction.map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: `1px solid ${color.greenAccent[500]}`,
                  borderRadius: 1,
                  p: 1,
                  textAlign: "right",
                  "&:hover": {
                    background: color.greenAccent[400],
                    transition: "all 1s",
                  },
                  cursor: "pointer",
                }}
              >
                <Avatar sx={{ background: color.redAccent[200], mb: 1 }} />
                <Box>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    Name:{" "}
                    <Typography sx={{ color: color.grey[400] }}>
                      {"kebba waiga"}
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    Rank:{" "}
                    <Typography sx={{ color: color.grey[400] }}>
                      {"kebba waiga"}
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    Region:{" "}
                    <Typography sx={{ color: color.grey[400] }}>
                      {"kebba waiga"}
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    Total Fine:{" "}
                    <Typography sx={{ color: color.grey[400] }}>
                      {"kebba waiga"}
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    Police Station:{" "}
                    <Typography sx={{ color: color.grey[400] }}>
                      {"kebba waiga"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box>
        {/* add botten */}
        {toggleAdd && <MakeFine setToggleAdd={setToggleAdd} />}
        {status === "client" ? (
          <Box sx={addButtonContainer} onClick={ToggleAddFunction}>
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
