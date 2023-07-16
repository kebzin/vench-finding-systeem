import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import { useNavigate } from "react-router-dom";
import { WeekilyDataAnalysys } from "../../pages/index";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useQuery, useQueryClient } from "react-query";
import { GMD_CURRENC_FORMAT } from "../../global/GlobalVeriableFormat";
import AddBoxIcon from "@mui/icons-material/AddBox";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

// recent transaction .map
const recentTransaction = [{}, {}, {}, {}, {}];

const Dashboard = () => {
  const {
    setIsSidebar,
    setTopbar,
    setOPenDialog,
    setDialogMessage,
    setErrorIcon,
  } = useStateContext();
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
  const [toggleAdd, setToggleAdd] = useState(
    user?.Officers?.role === "Sub Admin" ||
      user?.Officers?.role === "Administrator"
      ? false
      : true
  );

  // veribles
  const date = Date.now(); // getting the date
  const todayMonth = new Date(date); // getting the full date of the current year

  // states
  const [dateValue, setDateValue] = useState();
  const [month, setMonth] = useState(todayMonth.getMonth()); // the current month
  const [year, setYear] = useState(todayMonth.getFullYear()); // the current year
  const [TopOfficerMonth, setTopOfficerMonth] = useState(todayMonth.getMonth()); // the current month
  const [TopOfficersYear, setTopOfficersYear] = useState(
    todayMonth.getFullYear() // the current year
  );

  // hooks

  const AxiousPrivate = useAxiousPrivate(); // hooks that take the user accesstoken  to validate befor sending the request

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
        <Typography>{refetch()}</Typography>
      </Box>
    );
  }

  // filtering to show the data base on the user selection date
  const currentMonthAndYear = data?.filter((element) =>
    element?.createdAt?.startsWith(`${year}-${month}`)
  );

  const HandleMonthFilter = (event) => {
    setMonth(event.target.value);
    if (month > todayMonth.getMonth()) {
      // checking if the usere click on the a particulare month that is yet to come
      setOPenDialog(true);
      setErrorIcon(true);
      return setDialogMessage(
        // if thats the case then the user will be notefied that, that particuler month is not valid for data processing to be perform
        `OOps this month you selected is yet to come. No data processing will be performed`
      );
    }
  };
  // adding the total amount of all the fine including pending
  var TotalAmount = 0;
  for (let index = 0; index < data?.length; index++) {
    const element = data[index]?.fineAmount.replace(/[^\d.-]/g, ""); // extract the numerical value from the string
    if (!Number.isNaN(element)) {
      // add a check for NaN values
      TotalAmount += parseFloat(element);
      console.log("total", (TotalAmount += parseFloat(element)));
    }
  }

  const HandleYer = (event) => {
    setYear(event.target.value);
    if (year > todayMonth.getFullYear()) {
      // checking if the usere click on the a particulare month that is yet to come
      setOPenDialog(true);
      setErrorIcon(true);
      return setDialogMessage(
        // if thats the case then the user will be notefied that, that particuler month is not valid for data processing to be perform
        `OOps this year ${year}  selected is yet to come. No data processing will be performed`
      );
    }
  };

  // funtion for toggling the visibility of of ther add component in the client side

  // filtering the find data returned by the server to get all the pending from the list and none pending from the list
  const PendingLength = data?.filter(
    (element) => element?.status === "Pending"
  );

  const Compleate = data?.filter((element) => element?.status === "Completed");

  let CompleFineTotal = 0;
  for (let index = 0; index < Compleate?.length; index++) {
    const element = Compleate[index].fineAmount?.replace(/[^\d.-]/g, "");
    if (!isNaN(element)) {
      CompleFineTotal += parseFloat(element);
    }
  }

  return (
    <React.Fragment>
      {/* dashboard content */}

      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        <Button
          sx={{
            mt: 1,
            ml: 3,
            top: 70,
            position: "fixed",
            right: 100,
            color: color.greenAccent[400],
            padding: 1,
          }}
          variant="outlined"
          startIcon={<AddBoxIcon />}
          onClick={() => setToggleAdd((prev) => !prev)}
        >
          make fine
        </Button>
        {user?.Officers?.role === "Administrator" ||
        user?.Officers?.role === "Sub Admin" ? (
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
                  title={data?.length}
                  subtitle={
                    user?.Officers?.role === "Administrator"
                      ? "Total Fines"
                      : "Number of Fines I Made"
                  }
                  progress={`0.${PendingLength?.length}`}
                  increase={`+ ${PendingLength?.length}`}
                  complete={`+ ${Compleate?.length}`}
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
                  title={GMD_CURRENC_FORMAT.format(CompleFineTotal)}
                  subtitle="Revenue Generated from Completered "
                  progress={`0.${PendingLength.length}`}
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
                  title={`${GMD_CURRENC_FORMAT.format(TotalAmount)}`} // formating the total amount to the gmd currency format
                  subtitle="Total Revenue from All"
                  // progress="0.50"
                  // increase="+21%"
                  increase={`+ ${PendingLength.length}`}
                  complete={`+ ${Compleate.length}`}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {" "}
                  <Typography sx={{ p: 1.5, fontSize: 20 }}>
                    This Month Data Analysis
                  </Typography>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Monthly
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={month}
                      onChange={(event) => HandleMonthFilter(event)}
                      autoWidth
                      label="Age"
                    >
                      <MenuItem value={month} defaultValue={month}>
                        {month}
                      </MenuItem>
                      <MenuItem value={`01`}>Jan</MenuItem>
                      <MenuItem value={`02`}>Feb</MenuItem>
                      <MenuItem value={`03`}> Mar</MenuItem>
                      <MenuItem value={`04`}>Apr</MenuItem>
                      <MenuItem value={`05`}>MAy</MenuItem>
                      <MenuItem value={`06`}> Jun </MenuItem>
                      <MenuItem value={`07`}>Jul</MenuItem>
                      <MenuItem value={`08`}>Augt</MenuItem>
                      <MenuItem value={`09`}> Sept </MenuItem>
                      <MenuItem value={`10`}>Oct</MenuItem>
                      <MenuItem value={`11`}>Nov</MenuItem>
                      <MenuItem value={`12`}> Dec</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={year}
                      onChange={(event) => HandleYer(event)}
                      autoWidth
                      label="Year"
                    >
                      <MenuItem value={year} defaultValue={year}>
                        {year}
                      </MenuItem>
                      <MenuItem value={2023}>2023</MenuItem>
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2025}>2025</MenuItem>
                      <MenuItem value={2026}>2026</MenuItem>
                      <MenuItem value={2027}>2027</MenuItem>
                      <MenuItem value={2028}>2028</MenuItem>
                      <MenuItem value={2029}>2029</MenuItem>
                      <MenuItem value={2030}>2030</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

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
                  {/*  date filter  */}

                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Monthly
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={month}
                      onChange={(event) => HandleMonthFilter(event)}
                      autoWidth
                      label="Age"
                    >
                      <MenuItem value={month} defaultValue={month}>
                        {month}
                      </MenuItem>
                      <MenuItem value={`01`}>Jan</MenuItem>
                      <MenuItem value={`02`}>Feb</MenuItem>
                      <MenuItem value={`03`}> Mar</MenuItem>
                      <MenuItem value={`04`}>Apr</MenuItem>
                      <MenuItem value={`05`}>MAy</MenuItem>
                      <MenuItem value={`06`}> Jun </MenuItem>
                      <MenuItem value={`07`}>Jul</MenuItem>
                      <MenuItem value={`08`}>Augt</MenuItem>
                      <MenuItem value={`09`}> Sept </MenuItem>
                      <MenuItem value={`10`}>Oct</MenuItem>
                      <MenuItem value={`11`}>Nov</MenuItem>
                      <MenuItem value={`12`}> Dec</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={year}
                      onChange={(event) => HandleYer(event)}
                      autoWidth
                      label="Year"
                    >
                      <MenuItem value={year} defaultValue={year}>
                        {year}
                      </MenuItem>
                      <MenuItem value={2023}>2023</MenuItem>
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2025}>2025</MenuItem>
                      <MenuItem value={2026}>2026</MenuItem>
                      <MenuItem value={2027}>2027</MenuItem>
                      <MenuItem value={2028}>2028</MenuItem>
                      <MenuItem value={2029}>2029</MenuItem>
                      <MenuItem value={2030}>2030</MenuItem>
                    </Select>
                  </FormControl>
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
        {user?.Officers?.role === "Administrator"
          ? null
          : toggleAdd && <MakeFine setToggleAdd={setToggleAdd} />}
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
