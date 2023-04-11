import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/Contex";

import { tokens } from "../../../theme";
import { useReactToPrint } from "react-to-print";
import PaymentDetails from "./paymentDetails";

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
  const queryclient = useQueryClient();

  // state
  const [hideAmmount, setHideAmmount] = useState(false);
  const [TicketNumber, setTicketNumber] = useState("");
  const [Price, setPrice] = useState();
  const [hideButton, setHideButton] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Erro, SetError] = useState("");
  const { setDialogMessage, setOPenDialog } = useStateContext();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { isLoading, error, data, refetch } = useQuery(
    "transaction",
    async () => {
      return await axios
        .get(`http://localhost:3009/api/fine/single/${TicketNumber}`)
        .then((respond) => {
          setLoading(false);
          setHideAmmount(true);
          setShowButton(true);
          setHideButton(false);
          return respond.data;
        })
        .catch((err) => {
          console.log("err", err);
          SetError(err?.response?.data.message);
          setLoading(false);
        });
    },
    {
      enabled: false,
    }
  );

  console.log(data);
  const mutation = useMutation(
    (newPost) => {
      return axios.put(
        `http://localhost:3009/api/fine/single/${TicketNumber}`,
        newPost
      );
    },
    {
      onSuccess: (response) => {
        setOPenDialog(true);
        setDialogMessage(" Payment Successful Made ");
        setLoading(false);
        setHideAmmount(false);
        setShowButton(false);
        setHideButton(true);
        refetch();
        handlePrint();
        queryclient.invalidateQueries("transaction");
      },
      onError: (error) => {
        setOPenDialog(true);
        console.log(error);
        setDialogMessage(error.message);
        setLoading(false);
      },
    }
  );

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
  const amountpa = parseInt(data?.fineAmount?.slice(3));
  const total = amountpa - data?.amountPaid;

  const HandlePaymentUpdate = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      mutation.mutate({
        amountPaid: data?.amountPaid + parseInt(Price),
        status: data?.amountPaid === amountpa ? "Compleated" : "Pending",
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // handle print

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
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
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
              {Erro}
            </Typography>
          </Box>
        </Box>
        {/* detail part */}
        <Box sx={{ flex: 1, background: color.primary[400], width: "25%" }}>
          {isLoading ? (
            <Box>loading</Box>
          ) : error ? (
            <Box>error</Box>
          ) : (
            <PaymentDetails data={data} ref={componentRef} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
