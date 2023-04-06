import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  colors,
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/Contex";
import { makeRequest } from "../../../hooks/axious";
import useAxiousPrivate from "../../../hooks/useAxiousPrivate";
import { tokens } from "../../../theme";
import { Try } from "@mui/icons-material";

const Payment = () => {
  // states
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const { setIsSidebar, setTopbar } = useStateContext();
  useEffect(() => {
    setIsSidebar(false);
    setTopbar(false);
  }, []);
  // hooks
  const Navigate = useNavigate();
  const Location = useLocation();
  const AxiousPrivate = useAxiousPrivate();

  // state
  const [hideAmmount, setHideAmmount] = useState(false);
  const [TicketNumber, setTicketNumber] = useState("");
  const [TicketAmount, setTicketAmount] = useState("");
  const [hideButton, setHideButton] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, SetError] = useState("");

  //   functions

  // const { isLoading, error, data, refetch } = useQuery(
  //   "transaction",() =>
  //     axios.get(`http://localhost:3009/api/fine/single/${TicketNumber}`)
  //       .then((result) => {
  //         if (result.data.response === "401") {
  //           setLoading(false);
  //         }
  //       })
  //       .catch((err) => console.log(err)),

  //   {
  //     enabled: false,
  //     onSuccess: (result) => {
  //       console.log("result", result);
  //       if (result.data.response === "401") {
  //         setLoading(false);
  //       }
  //       setLoading(false);
  //       setHideAmmount(true);
  //       setShowButton(true);
  //       setHideButton(false);
  //     },
  //     onError: (err) => {
  //       console.log(err);
  //       setLoading(false);
  //     },
  //   }
  // );

  const { isLoading, error, data, refetch } = useQuery(
    "transaction",
    async () => {
      return await axios
        .get(`http://localhost:3009/api/fine/single/${TicketNumber}`)
        .then((respond) => {
          if (respond.ok) {
            setLoading(false);
            throw new Error(SetError(respond.data.message));
          }

          setLoading(false);
          return respond.data;
        })
        .catch((err) => {
          console.log(err);
          SetError(err.response.data.message);
          setLoading(false);
        });
    },
    {
      enabled: false,
    }
  );
  console.log(error);
  console.log(data);
  const HandleRequesstTicket = async (event) => {
    event.preventDefault();
    if (TicketNumber.length < 24)
      return SetError(
        "Ticket Number you provided is shot,  Please try again,  Valid Ticket Number is 24 characters long"
      );
    if (TicketNumber.length > 24)
      return SetError(
        "The Ticket Number you provided is long,  Please try again,  Valid Ticket Number is 24 characters long"
      );

    setLoading(true);

    try {
      await refetch();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const HandlePaymentUpdate = (event) => {
    event.preventDefault();

    try {
      setHideAmmount(false);
      setShowButton(false);
      setHideButton(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* form part */}
        <Box sx={{ flex: 2 }}>
          <Box
            className="imageAinimation"
            display="flex"
            alignItems="center"
            justifyContent="center"
            margin="auto"
            height="100vh"
            flexDirection={"column"}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: "center",
                fontWeight: 1000,
                fontSize: 35,
                pb: 5,
                color: color.greenAccent[500],
                letterSpacing: 2,
              }}
            >
              Make Ticket Payment
            </Typography>
            <Box
              className="imageAinimation"
              padding="2rem"
              minWidth={"25%"}
              borderRadius=".7rem "
              backgroundColor={color.primary}
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
              border={`1px solid ${
                theme.palette.mode === "dark" ? color.greenAccent[400] : null
              }`}
            >
              <form>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="outlined"
                  className="imageAinimation"
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Request Ticket  Number"
                    variant="outlined"
                    size="full"
                    type="text"
                    placeholder="Enter Request Ticket  Number"
                    onChange={(event) => {
                      setTicketNumber(event.target.value);
                      SetError(null);
                    }}
                  />
                </FormControl>
                {hideAmmount && (
                  <FormControl
                    sx={{ m: 1, width: "100%" }}
                    variant="outlined"
                    className="imageAinimation"
                  >
                    <TextField
                      id="outlined-basic"
                      label="Enter Amount"
                      variant="outlined"
                      size="full"
                      type="text"
                      placeholder="Enter Amount"
                    />
                  </FormControl>
                )}
                {hideButton && (
                  <LoadingButton
                    sx={{ m: 1 }}
                    size="larger"
                    color="primary"
                    onClick={HandleRequesstTicket}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    style={{ backgroundColor: color.greenAccent[600] }}
                  >
                    <span style={{ padding: "10px" }}>requerst ticket</span>
                  </LoadingButton>
                )}
                {showButton && (
                  <LoadingButton
                    sx={{ m: 1 }}
                    size="larger"
                    color="primary"
                    onClick={HandlePaymentUpdate}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    style={{ backgroundColor: color.greenAccent[600] }}
                  >
                    <span style={{ padding: "10px" }}>Make Payment</span>
                  </LoadingButton>
                )}
              </form>
            </Box>
            <Typography
              sx={{
                mt: 6,
                fontSize: 16,
                color: color.redAccent[400],
                maxWidth: "50%",
              }}
            >
              {Error}
            </Typography>
          </Box>
        </Box>
        {/* detail part */}
        <Box sx={{ flex: 1, background: color.primary[400] }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 30,
              marginTop: 5,
              fontWeight: 1000,
            }}
          >
            Ticket Info{" "}
          </Typography>
          <Divider sx={{ mt: 1 }} />

          <Box sx={{ mt: 5, pl: 10, pr: 10 }}>
            <Box>
              {" "}
              <Stack direction="row" spacing={2}>
                <Typography>Issue Date: </Typography>
                <Typography>{data?.createdAt}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography> Ticket ID : </Typography>
                <Typography>{data?.id}</Typography>
              </Stack>
            </Box>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Number Plate :</Typography>
              <Typography>{data?.NumberPlat}</Typography>
            </Stack>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Drivers Licen Number : </Typography>
              <Typography> {data?.LicenNumber} </Typography>
            </Stack>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Offence Commited :</Typography>
              <Typography>{data?.OffenceCommited}</Typography>
            </Stack>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Offence Location :</Typography>
              <Typography>Serrekunda </Typography>
            </Stack>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Charge Amount :</Typography>
              <Typography>{data?.fineAmount}</Typography>
            </Stack>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Amount Paid : </Typography>
              <Typography>GMD 0 </Typography>
            </Stack>
            <Stack
              sx={{ mt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Typography variant="h6">Remaining Balance :</Typography>
              <Typography>GMD 200 </Typography>
            </Stack>
          </Box>
          <Divider sx={{ mt: 3 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
