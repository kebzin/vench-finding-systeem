import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { forwardRef } from "react";
import { tokens } from "../theme";
import Barcode from "react-barcode";

const PritTickets = forwardRef((props, ref) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const timeElaps = Date.now();
  const today = new Date(timeElaps);

  return (
    <React.Fragment>
      <Box
        ref={ref}
        sx={{
          objectFit: "contain",
          // position: "fixed",
          height: "auto",
          top: 20,
          zIndex: 1000,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark" ? color.primary[400] : "white",
          boxShadow:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          border: `1px solid 
                ${
                  theme.palette.mode === "dark" ? color.greenAccent[400] : null
                }`,
        }}
      >
        <Box className="certificate" sx={{ m: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Ticket
          </Typography>
          <Typography variant="h5"> ID: {props.data?.id}</Typography>
          <Box sx={{ textAlign: "right" }}>
            <Typography>info</Typography>
            {/* <Typography> {props.data?.officerId?.email}</Typography>
            <Typography>+220 {props.data?.officerId?.PhoneNumber}</Typography> */}
            <Typography>{today.toUTCString()}</Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
            }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  Number Plate
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {" "}
                  {props.data?.NumberPlat}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{}}>
                  Driver Licen Number
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {" "}
                  {props.data?.LicenNumber}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{}}>
                  Offence Commited
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {" "}
                  {props.data?.OffenceCommited}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{}}>
                  Offence Location
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {" "}
                  {props.data?.OffenceCommited}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{}}>
                  Charge Amount:
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {" "}
                  {props.data?.fineAmount}
                </Typography>
              </Stack>

              {/* 
              
            
            
              */}
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{}}
            >
              <Typography variant="h6" sx={{}}>
                Charge Amount:
              </Typography>
              <Typography sx={{ color: color.grey[400] }}>
                {" "}
                {props.data?.fineAmount}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{}}
            >
              <Typography variant="h6" sx={{}}>
                Balance:
              </Typography>
              <Typography sx={{ color: color.grey[400] }}>
                {" "}
                {props.data?.fineAmount}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{}}
            >
              <Typography variant="h6" sx={{}}>
                Total:
              </Typography>
              <Typography sx={{ color: color.grey[400] }}>
                {" "}
                {props.data?.fineAmount}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ p: 0.2 }}>
                Bank Name:{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 0.2 }}>
                Account Name:{" "}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: color.grey[200], p: 0.4 }}>
                GTrust Bank LTD
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 0.4 }}>
                Offence Bank Account
              </Typography>
            </Box>
          </Box>

          {/* backord */}
          <Box
            sx={{
              width: "100%",
              objectFit: "contain",
            }}
          >
            <Barcode width={1} value={props.data?.id} />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
});

export default PritTickets;
