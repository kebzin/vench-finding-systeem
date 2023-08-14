import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReplyIcon from "@mui/icons-material/Reply";
import PrintIcon from "@mui/icons-material/Print";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

import PritTickets from "../../components/PritTickets";
import { useQuery } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useReactToPrint } from "react-to-print";
import { useStateContext } from "../../context/Contex";

const TransactionView = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [showprint, setShowPrint] = useState(false);
  const { sidebarWidth } = useStateContext();

  //veriable

  // hooks
  const Navigate = useNavigate();
  const AxiousPrivate = useAxiousPrivate();
  const { id } = useParams();

  // handle print

  // handle print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => setShowPrint(true),
    content: () => componentRef.current,
    onAfterPrint: () => setShowPrint(false),
  });

  // fetch data
  const { isLoading, error, data, refetch } = useQuery("transaction", () =>
    AxiousPrivate.get(`/fine/single/${id}`)
      .then((result) => result.data)
      .catch((err) => console.log(err))
  );

  const amountpa = parseInt(data?.fineAmount?.slice(3));
  const total = amountpa - data?.amountPaid;

  // google map: rendering the map:

  const mapOptions = {
    zoom: 12,
    center: {
      lat: data?.Latitude,
      lng: data?.Longititude,
    },
  };
  const containerStyle = {
    Width: "300px",
    Height: "300px",
  };

  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "15px;",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Viewing the transaction "
          subtitle="Congratulations! You are now viewing the transaction you selected. To enhance your navigation experience and ensure utmost convenience, we have provided all the necessary details about this transaction, making your journey through the information seamless and enjoyable. If you wish to have a physical copy, simply click on the `Print` button to get a printout of the transaction"
        />
      </Box>
      <IconButton
        sx={{
          p: 2,
          background: color.primary[400],
          borderRadius: 2,
        }}
        onClick={() => Navigate("/transaction")}
      >
        Back
      </IconButton>
      <br />
      {/* offince details */}
      <Box
        sx={{
          backgroundColor: color.primary[400],
          p: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ color: color.greenAccent[500] }}>
          Offence Details
        </Typography>

        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* offe sx={{color: c}}nce details */}
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Offence Date
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.createdAt}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Number Plate
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.NumberPlat}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Driver Licen Number
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.LicenNumber}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Offence Commited
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.OffenceCommited}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Charge Amount
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.fineAmount}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Amount Paid
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  GMD {data?.amountPaid}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Amount Left
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  GMD {total}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Payment Status
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.status}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Bonuse Gain from transaction
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  GMD {data?.bonus}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Region:
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.region}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Offence Description
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.fineDescription}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
              >
                <Typography variant="h6" sx={{}}>
                  {" "}
                  Location of Offence
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {data?.Location}
                </Typography>
              </Stack>
            </Box>

            {/* geolocarion */}
            <Box>
              <Typography sx={{ color: color.greenAccent[500], p: 1 }}>
                Offence Location
              </Typography>
              <Box
                sx={{
                  border: `1px solid ${color.greenAccent[700]}`,
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {isLoading ? (
                  <Typography>loading the map</Typography>
                ) : (
                  <LoadScript googleMapsApiKey="AIzaSyCeme5ngsB5BXH_mO3HdGGmwQ-JyDlzuSo">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={{ lat: data?.Latitude, lng: data?.Longititude }}
                      zoom={12}
                    >
                      <Marker
                        position={{
                          lat: data?.Latitude,
                          lng: data?.Longititude,
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>
                )}
              </Box>
            </Box>
            <Box>
              {" "}
              <Typography variant="h6" sx={{ color: color.greenAccent[500] }}>
                Officer who conduct this fine
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Officer Name{" "}
                  </Typography>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Officer Rank{" "}
                  </Typography>
                  <Typography variant="h6" sx={{ p: 1 }}>
                    Police Station{" "}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: color.grey[200], p: 1 }}>
                    {data?.officerId?.firstName +
                      " " +
                      data?.officerId?.lastName}
                  </Typography>
                  <Typography sx={{ color: color.grey[200], p: 1 }}>
                    : Officer Rank{" "}
                  </Typography>
                  <Typography sx={{ color: color.grey[200], p: 1 }}>
                    {data?.officerId?.PoliceStation}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          background: color.primary[400],
          borderRadius: 2,
          p: 1,
          mt: 2,
          float: "right",
          mb: 2,
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => Navigate("/transaction")}
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? color.redAccent[700]
                  : color.redAccent[300],
              border: "0px solid black",
              color: "white",
            }}
            variant="outlined"
            startIcon={<ReplyIcon />}
          >
            Back
          </Button>
          <Button
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? color.greenAccent[700]
                  : color.greenAccent[300],
              border: "0px solid black",
              color: "white",
            }}
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </Box>
      {showprint && <PritTickets ref={componentRef} data={data} />}
    </Box>
  );
};

export default TransactionView;
