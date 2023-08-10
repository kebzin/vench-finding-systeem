import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../../context/Contex";
import BarcodeReader from "react-barcode-reader";

import { tokens } from "../../../theme";
import { useReactToPrint } from "react-to-print";
import PaymentDetails from "./paymentDetails";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContex";

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
  const { setDialogMessage, setOPenDialog, setErrorIcon } = useStateContext();

  const { user } = useAuthContext();

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

  const mutation = useMutation(
    (newPost) => {
      return axios.put(
        `http://localhost:3009/api/fine/single/${TicketNumber}`,
        newPost
      );
    },
    {
      onSuccess: async (response) => {
        setOPenDialog(true);
        setDialogMessage(" Payment Successful Made ");
        setLoading(false);
        setHideAmmount(false);
        setShowButton(false);
        setHideButton(true);
        await refetch();
        setTicketNumber("");
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
  const amountpa = parseInt(data?.fineAmount?.replace(/[^\d.-]/g, "")); // extract the numerical value from the string

  const HandlePaymentUpdate = (event) => {
    event.preventDefault();
    setLoading(true);
    //  const amountpaided = data?.amountPaid?.replace(/[^\d.-]/g, "")

    if (typeof parseInt(Price) === "string") {
      return (
        setErrorIcon(true), //
        setOPenDialog(true),
        setDialogMessage("Price most be a Number "),
        setLoading(false)
      );
    }
    const CheckAmount = data?.amountPaid + parseInt(Price);
    if (CheckAmount > parseInt(amountpa)) {
      return (
        setErrorIcon(true), //
        setOPenDialog(true),
        setDialogMessage(
          "The amount you are trying to paid is more than the amount Charged to Pay"
        ),
        setLoading(false)
      );
    }
    try {
      mutation.mutate({
        amountPaid: data?.amountPaid + parseInt(Price),
        status: CheckAmount === amountpa ? "Completed" : "Pending",
        tellerId: "64bef27d7aeae73a0e7bedc1",
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // handle print
  const Handlescannn = (event) => {
    setTicketNumber(event);
    refetch();
  };

  return (
    <Box>
      <BarcodeReader
        onScan={(event) => Handlescannn(event)}
        onError={(error) => SetError(error)}
      />
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
                    placeholder={
                      TicketNumber === null
                        ? "Enter Request Ticket  Number"
                        : null
                    }
                    value={TicketNumber}
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
                    type="number"
                  >
                    <TextField
                      id="outlined-basic"
                      label="Enter Amount"
                      variant="outlined"
                      size="full"
                      type="number"
                      placeholder="Enter Amount"
                      onChange={(event) => {
                        setPrice(event.target.value);
                        SetError(null);
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
                  <Box>
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
                    <LoadingButton
                      sx={{ m: 1 }}
                      size="larger"
                      color="primary"
                      onClick={handlePrint}
                      loadingPosition="end"
                      variant="contained"
                      style={{ backgroundColor: color.greenAccent[600] }}
                    >
                      <span style={{ padding: "10px" }}>Print Recit</span>
                    </LoadingButton>
                  </Box>
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
            <PaymentDetails data={data} ref={componentRef} Price={Price} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
