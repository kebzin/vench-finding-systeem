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
    content: () => componentRef.current,
  });

  // fetch data
  const { isLoading, error, data, refetch } = useQuery("transaction", () =>
    AxiousPrivate.get(`/fine/single/${id}`)
      .then((result) => result.data)
      .catch((err) => console.log(err))
  );

  const amountpa = parseInt(data?.fineAmount?.slice(3));
  const total = amountpa - data?.amountPaid;

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
          subtitle="Your are currently viewing the transaction you clicked one. To simplify things and making your navigation enjoyable, we make sure that all the nessery details  about this transaction are available"
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
                  Offence Description
                </Typography>
                <Typography sx={{ color: color.grey[400] }}>
                  {" "}
                  Offence Description
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
                  {" "}
                  Location of Offence
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.2450536361803!2d-16.708478284742203!3d13.397147209021204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec2993eb33fc795%3A0xf45b86605e2b921b!2sSukuta%20Traffic%20Light!5e0!3m2!1sen!2sgm!4v1678199179149!5m2!1sen!2sgm"
                  // width="600"
                  // height="450"
                  // style="border:0;"
                  style={{
                    width: "100%",
                    height: 300,
                    border: "0px ",
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
                    {" "}
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
