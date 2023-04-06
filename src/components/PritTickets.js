import { RingVolume, Today } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { tokens } from "../theme";

const PritTickets = ({ data }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const timeElaps = Date.now();
  const today = new Date(timeElaps);

  const HandlePrint = () => {
    const printContents =
      document.getElementsByClassName(".certificate").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Box
          className="certificate"
          sx={{
            position: "fixed",

            height: "auto",
            top: "25%",

            margin: "auto",
            justifyItems: "center",
            right: "30%",
            borderRadius: 2,
            p: 3,
            zIndex: 1000,

            background:
              theme.palette.mode === "dark" ? color.primary[400] : "white",

            boxShadow:
              theme.palette.mode === "dark"
                ? color.primary[400]
                : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            border: `1px solid 
         ${theme.palette.mode === "dark" ? color.greenAccent[400] : null}`,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Invoice
          </Typography>
          <Typography variant="h5"> ID: {data?.id}</Typography>
          <Box sx={{ textAlign: "right" }}>
            <Typography>info</Typography>
            <Typography> {data?.officerId?.email}</Typography>
            <Typography>+220 {data?.officerId?.PhoneNumber}</Typography>
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
                  {data?.NumberPlat}
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
                  {data?.LicenNumber}
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
                  {data?.OffenceCommited}
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
                  {data?.OffenceCommited}
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
                  {data?.fineAmount}
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
                {data?.fineAmount}
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
                {data?.fineAmount}
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
                {data?.fineAmount}
              </Typography>
            </Stack>
          </Box>

          {/* <Box
            sx={{
              mb: 3,
              textAlign: "left",
              display: "flex",
              position: "absolute",
              right: 0,
            }}
          >
            <Box>
             
              <Typography variant="h6" sx={{ p: 0.2 }}>
                Current Balance:{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 0.2 }}>
                Total:{" "}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: color.grey[200], p: 0.4 }}>
                GMD {"500"}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 0.4 }}>
                GMD {"500"}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 0.4 }}>
                GMD {"500"}
              </Typography>
            </Box>
          </Box> */}

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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <LoadingButton
              size="larger"
              color="primary"
              // onClick={HandleCancel}
              loading={false}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 1 }}
              style={{
                backgroundColor: color.greenAccent[600],
                width: "100%",
                mt: 3,
              }}
            >
              <span style={{ padding: "10px" }}>cancel</span>
            </LoadingButton>
            <LoadingButton
              size="larger"
              color="primary"
              onClick={HandlePrint}
              loading={false}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 1 }}
              style={{
                backgroundColor: color.greenAccent[600],
                width: "100%",
                mt: 3,
              }}
            >
              <span style={{ padding: "10px" }}>Print</span>
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default PritTickets;
