import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { tokens } from "../../theme";

const Invoice = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const Navigate = useNavigate();

  //   veriables
  const timeElaps = Date.now();
  const today = new Date(timeElaps);

  //   functions
  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.print.close();
  };
  return (
    <Box className="Header">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={"Invoice"} />
      </Box>

      <Box
        id="printablediv"
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            background: color.primary[400],
            flex: 3,
            p: 3,
            borderRadius: 1,
          }}
        >
          {/* invoice  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {/* office info */}
            <Box>
              <Typography sx={{ pt: 1, pb: 1 }}>
                Office 149, 450 South Brand Brooklyn
              </Typography>
              <Typography>San Diego County, CA 91905, Gambia</Typography>
              <Typography sx={{ pt: 1, pb: 1 }}>
                +220(249) 32 68, +220 (524) 524 34 00
              </Typography>
            </Box>
            {/* invoice info */}
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 25 }}>
                Invoice
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ pt: 1, pb: 1 }}
              >
                <Typography>Date Issued:</Typography>
                <Typography sx={{ pl: 1 }}>{today.toUTCString()}</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Date Due:</Typography>
                <Typography sx={{ pl: 1 }}>{today.toUTCString()}</Typography>
              </Stack>{" "}
            </Box>
          </Box>
          <Divider sx={{ pt: 4, pb: 4 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              pt: 4,
            }}
          >
            {/* drivers info */}
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: 18, pb: 3 }}>
                Invoice To :
              </Typography>

              <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 300 }}>
                Kebba waiga
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 300 }}>
                Manjai Kunda
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 300 }}>
                +220 2493268 / 5243400
              </Typography>
            </Box>
            {/* Bill info */}
            <Box>
              {" "}
              <Typography sx={{ fontWeight: 500, fontSize: 18, pb: 3 }}>
                Bill To :
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Offence Commited :</Typography>
                <Typography variant="h6" sx={{ pl: 1, pt: 1 }}>
                  Driving Without Licen
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Offence Date :</Typography>
                <Typography variant="h6" sx={{ pl: 1, pt: 1 }}>
                  {today.toUTCString()}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Location Commited :</Typography>
                <Typography variant="h6" sx={{ pl: 1, pt: 1 }}>
                  Sukut Trafic Light
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Number Plate :</Typography>
                <Typography variant="h6" sx={{ pl: 1, pt: 1 }}>
                  BJL 2345
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Licen Number :</Typography>
                <Typography variant="h6" sx={{ pl: 1, pt: 1 }}>
                  2345653456
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Charge Amount :</Typography>
                <Typography sx={{ pl: 1 }}>GMd 500</Typography>
              </Stack>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: 18, pb: 3 }}>
              Offence Discription :
            </Typography>
            <Typography minWidth={"25%"} sx={{}}>
              This Driver was driving wothout any licen. Futer more he was
              driving <br></br>
              wit te qualification to drive, no driving skill, no document that{" "}
              <br></br>
              will prove that he has an experience in driving{" "}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              {/* payment info */}
              <Typography sx={{ fontWeight: 500, fontSize: 18, pb: 3, mt: 2 }}>
                Payment Information :
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Bank Name :</Typography>
                <Typography sx={{ pl: 1 }}>Trust Bank</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography>Account Number :</Typography>
                <Typography sx={{ pl: 1 }}>236534526353653 </Typography>
              </Stack>
            </Box>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{ p: 1 }}>
                  previouse Balance :
                </Typography>
                <Typography sx={{ pl: 1 }}>GMD : 200 </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{ p: 1 }}>
                  Current Balance :
                </Typography>
                <Typography sx={{ pl: 1 }}>GMD : 500 </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{}}
              >
                <Typography variant="h6" sx={{ p: 1 }}>
                  Total Balance :
                </Typography>
                <Typography sx={{ pl: 1 }}>GMD : 700 </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: color.primary[400],
            flex: 1,
            maxHeight: "25%",
            height: "25%",
            p: 2,
          }}
        >
          {/* actions */}
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
            onClick={Print}
          >
            <span style={{ padding: "10px" }}>Print</span>
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
            <span style={{ padding: "10px" }}>Download</span>
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
            onClick={() => Navigate(-1)}
          >
            <span style={{ padding: "10px" }}>Back</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
