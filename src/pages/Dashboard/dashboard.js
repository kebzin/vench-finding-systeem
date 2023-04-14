import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Header, MakeFine, StatBox, LineChartAdmin } from "../../components";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useStateContext } from "../../context/Contex";
import { useAuthContext } from "../../context/AuthContex";
import { useLocation, useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { WeekilyDataAnalysys } from "../../pages/index";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useQuery, useQueryClient } from "react-query";

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
  const [toggleAdd, setToggleAdd] = useState(true);

  // states
  const [dateValue, setDateValue] = useState();

  // functions

  const Location = useLocation();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  // functions

  const { isLoading, error, data, refetch } = useQuery(
    "transaction",
    async () =>
      await AxiousPrivate.get(
        user?.Officers?.role === "Employee"
          ? `/fine/fine/${user?.Officers?.id}`
          : `/fine/fine/`
      )
        .then((result) => result.data)
        .catch((err) => console.log(err))
  );
  if (isLoading) {
    return (
      <Box>
        <Typography>loading</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography>error</Typography>
      </Box>
    );
  }
  const HandleDate = (event) => {
    setDateValue(event.target.value);
  };

  const ToggleAddFunction = (event) => {
    setToggleAdd((previouseState) => !previouseState);
  };

  //length of the total fine

  const PendingLength = data?.filter((element) => element.status === "Pending");
  const Compleate = data?.filter((element) => element.status === "Compleated");

  const loginstatus = "Administrator";
  return (
    <React.Fragment>
      {/* dashboard content */}

      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        {user?.Officers?.role === "Administrator" ? (
          <Box>
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
                  title={data.length}
                  subtitle={
                    loginstatus === "Administrator"
                      ? "Total Fines"
                      : "Number of Fines I Made"
                  }
                  progress="0.7"
                  increase={`+ ${PendingLength.length}`}
                  complete={`+ ${Compleate.length}`}
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
                  subtitle="Revenue Generated"
                  progress="0.50"
                  increase={`+ ${PendingLength.length}`}
                  complete={`+ ${Compleate.length}`}
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
              gridAutoRows="500px"
              gap="20px"
            >
              <Box
                gridColumn="span 2"
                sx={{
                  mt: 2,
                  background: color.primary[400],
                }}
              >
                <LineChartAdmin />
              </Box>

              <Box
                sx={{ mt: 2, background: color.primary[400], overflow: "auto" }}
              >
                <Typography sx={{ p: 1.5, fontSize: 20 }}>
                  This Month Data Analysis
                </Typography>
                <Box>
                  <WeekilyDataAnalysys />
                </Box>
                <Box sx={{ pl: 2, pr: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Source</Typography>
                    <Typography>Total Price</Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Vench</Typography>
                    <Typography>GMD 500</Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Truck</Typography>
                    <Typography>GMD 700</Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>BUs</Typography>
                    <Typography>GMd 800</Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Motocycle</Typography>
                    <Typography>GMd 1,000</Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Others</Typography>
                    <Typography>GMd 1,000</Typography>
                  </Stack>
                </Box>
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
        ) : null}
      </Box>

      <Box>
        {/* add botten */}
        {user?.Officers?.role === "Administrator"
          ? null
          : toggleAdd && <MakeFine setToggleAdd={setToggleAdd} />}
        {user?.Officers?.role === "Administrator" ? null : (
          <Box sx={addButtonContainer} onClick={ToggleAddFunction}>
            <IconButton sx={{ p: 3 }}>
              <AddCircleRoundedIcon sx={{ fontSize: 44 }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
