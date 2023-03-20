import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../context/Contex";
import { axiousePrive } from "../hooks/axious";
import useAxiousPrivate from "../hooks/useAxiousPrivate";
import { tokens } from "../theme";

const addButtonContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  height: "100%",
};

const MakeFine = ({ setToggleAdd }) => {
  // states
  const [loading, setLoading] = useState(false);
  const [NumberPlat, setNumberPlat] = useState("");
  const [LicenNumber, setLicenNumber] = useState(null);
  const [DriverName, setDriverName] = useState("");
  const [OffenceCommited, setOffenceCommited] = useState("");
  const [Offerprice, setOfferprice] = useState("");
  const [offenceDescription, setOfferdescription] = useState("");
  const [DriverAddress, setDriverAddress] = useState(null);

  const { setDialogMessage } = useStateContext();

  // hooks
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  // fetch officers
  const { isLoading, data, error, refetch } = useQuery("driver", () => {
    return axiousePrive
      .get("driver/driver")
      .then((res) => res.data)
      .catch((err) => {
        console.log(error);
      });
  });

  // console.log(data);

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.post("/price/prices/", newPost);
    },
    {
      onSuccess: (response) => {},
      onError: () => {},
    }
  );

  //  function ::::::::::::::::::
  // making fine function
  const HandleFine = (event) => {
    event.preventDefault();
  };

  // handle filter
  // Filter array items based on search criteria (query)

  function filterItems(arr, query) {
    return arr.find((el) => el.driversLicensNumber === query);
  }

  const HandleFilter = (event) => {
    setLicenNumber(event.target.value);
    const driver = filterItems(data, LicenNumber);
    console.log("i found", driver);
    setDriverName(driver?.driversFirstName + " " + driver?.driversLastName);
    setDriverAddress(driver?.driversAddress);
    console.log(driver?.driversFirstName);
  };
  const theme = useTheme();
  const COLORS = tokens(theme.palette.mode);
  const AddButtonContainerContent = {
    position: "fixed",
    top: "25%",
    borderRadius: ".7rem",
    height: "auto",
    background: theme.palette.mode === "dark" ? COLORS.primary[400] : "white",
    padding: 3,
    margin: "auto",
    miniWidth: "50%",
    boxShadow:
      theme.palette.mode === "dark"
        ? COLORS.primary[400]
        : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    border: `1px solid 
        ${theme.palette.mode === "dark" ? COLORS.greenAccent[400] : null}`,
  };

  return (
    <Box sx={addButtonContainer} className="Transition">
      <Box sx={AddButtonContainerContent}>
        <form>
          <Box display="flex" flexDirection="column" alignItems="center">
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Number Plate"
                variant="outlined"
                size="full"
                type="email"
              />
            </FormControl>

            <FormControl
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
              onChange={(event) => HandleFilter(event)}
              value={LicenNumber}
            >
              <TextField
                id="outlined-basic"
                label=" Dreiver Licen Number"
                variant="outlined"
                size="full"
                type="text"
              />
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="full"
                type="text"
                value={DriverName}
                placeholder="Drivers Full Name"
                disabled
              />
            </FormControl>

            <FormControl
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
              placeholder="Driver Address"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="full"
                type="email"
                value={DriverAddress}
                placeholder="Driver Address"
                disabled
              />
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Offence  Commited"
                variant="outlined"
                size="full"
                type="text"
                onChange={() => {}}
              />
            </FormControl>
            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Offence  Commited"
                variant="outlined"
                size="full"
                type="text"
              />
            </FormControl>

            <FormControl
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
              // disabled
            >
              <textarea
                style={{
                  background: "inherit",
                  color: "inherit",
                  fontSize: "inherit",
                  padding: "10px",
                  border: `.3px solid ${COLORS.grey[500]}`,
                  outline: "inherit",
                  borderRadius: "5px",
                  placeContent: "center",
                }}
                minRows={2}
                placeholder={"Enter some Describtion"}
              />
            </FormControl>

            <LoadingButton
              sx={{
                width: "100%",
                mt: 2,
                background:
                  theme.palette.mode === "dark"
                    ? COLORS.greenAccent[700]
                    : COLORS.greenAccent[500],
                "&:hover": { background: COLORS.greenAccent[500] },
              }}
              onClick={() => {}}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span style={{ padding: "10px" }}>Post</span>
            </LoadingButton>

            <LoadingButton
              sx={{
                width: "100%",
                mt: 2,
                background:
                  theme.palette.mode === "dark"
                    ? COLORS.greenAccent[700]
                    : COLORS.greenAccent[500],
                "&:hover": { background: COLORS.greenAccent[500] },
              }}
              onClick={() => setToggleAdd(false)}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span style={{ padding: "10px" }}>Cancel</span>
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default MakeFine;
