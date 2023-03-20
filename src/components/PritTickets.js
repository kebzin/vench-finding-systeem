import { RingVolume, Today } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { tokens } from "../theme";

const PritTickets = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const timeElaps = Date.now();
  const today = new Date(timeElaps);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Box
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
          <Typography variant="h5"> ID: 283636f7f</Typography>
          <Box sx={{ textAlign: "right" }}>
            <Typography>info</Typography>
            <Typography> kebbawaiga@gmail.com</Typography>
            <Typography>+220 2493268</Typography>
            <Typography>{today.toUTCString()}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 2,
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ p: 0.4 }}>
                Car Number Plate:{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 0.4 }}>
                Driver Licen Number:{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 0.4 }}>
                Offence Commited:{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 0.4 }}>
                Offence Location:{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 0.4 }}>
                Offence Charge:{" "}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: color.grey[200], mt: 1.3 }}>
                BJL_366ET
              </Typography>
              <Typography variant="h6" sx={{ color: color.grey[200], mt: 1.3 }}>
                2735r7fr6484639f8e647
              </Typography>
              <Typography variant="h6" sx={{ color: color.grey[200], mt: 1.3 }}>
                Asulting police officer{" "}
              </Typography>
              <Typography variant="h6" sx={{ color: color.grey[200], mt: 1.3 }}>
                Serrekunda:{" "}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: color.grey[200], mt: 1.3, mb: 3 }}
              >
                GMD {"500"}
              </Typography>
            </Box>
          </Box>

          <Box
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
                Offence Charge:{" "}
              </Typography>
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
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 13 }}>
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
              // onClick={HandleOk}
              loading={false}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 1 }}
              style={{
                backgroundColor: color.greenAccent[600],
                width: "100%",
                mt: 3,
              }}
              onClick={() => window.print()}
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
