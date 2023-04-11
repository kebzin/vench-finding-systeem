import React from "react";
import { tokens } from "../../../theme";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";

const PaymentDetails = React.forwardRef((props, ref) => {
  const amountpa = parseInt(props.data?.fineAmount?.slice(3));
  const total = amountpa - props.data?.amountPaid;

  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  return (
    <Box ref={ref} sx={{ flex: 1, background: color.primary[400] }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 30,
          paddingTop: 5,
          fontWeight: 1000,
        }}
      >
        Ticket Info{" "}
      </Typography>
      <Divider sx={{ mt: 1 }} />

      <Box sx={{ mt: 5, pl: 15, pr: 15 }}>
        <Box>
          {" "}
          <Stack direction="row" spacing={2}>
            <Typography>Issue Date: </Typography>
            <Typography>{props.data?.createdAt}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography> Ticket ID : </Typography>
            <Typography>{props.data?.id}</Typography>
          </Stack>
        </Box>
        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6">Number Plate :</Typography>
          <Typography>{props.data?.NumberPlat}</Typography>
        </Stack>
        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6">Drivers Licen Number : </Typography>
          <Typography> {props.data?.LicenNumber} </Typography>
        </Stack>
        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6">Offence Commited :</Typography>
          <Typography>{props.data?.OffenceCommited}</Typography>
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
          <Typography variant="h6">Payment Status:</Typography>
          <Typography>{props.data?.status} </Typography>
        </Stack>

        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6">Charge Amount :</Typography>
          <Typography>{props.data?.fineAmount}</Typography>
        </Stack>
        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6">Amount Paid : </Typography>
          <Typography>GMD {props.data?.amountPaid} </Typography>
        </Stack>
        <Stack
          sx={{ mt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h6">Remaining Balance :</Typography>
          <Typography>GMD {total} </Typography>
        </Stack>
      </Box>

      <Divider sx={{ mt: 3 }} />
    </Box>
  );
});

export default PaymentDetails;
