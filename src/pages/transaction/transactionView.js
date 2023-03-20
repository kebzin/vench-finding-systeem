import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ReplyIcon from "@mui/icons-material/Reply";
import PrintIcon from "@mui/icons-material/Print";

import { tokens } from "../../theme";
import { useAuthContext } from "../../context/AuthContex";
import { Header } from "../../components";
import { useStateContext } from "../../context/Contex";

const TransactionView = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [showprint, setShowPrint] = useState(false);

  const { user } = useAuthContext();
  const {
    setToggleDelete,
    setToggleDeleteMessage,
    callfunctions,
    setCallFunctions,
  } = useStateContext();

  // hooks
  const Navigate = useNavigate();
  const { id } = useParams();

  //veriable
  const status = "pending";

  //functions
  // Handle delet
  const HandleDelete = () => {
    setToggleDelete(true);
    setToggleDeleteMessage("Are you sure you want to delete this Record?");
  };
  //
  // deleting
  if (callfunctions === true) {
    setCallFunctions(false);
    Navigate("/transaction");
  }

  const handleMarkAsPaid = () => {
    setToggleDelete(true);
    setToggleDeleteMessage(
      `Are you sure you want to mark this record as paid?   !!!!`
    );
  };

  // handle print
  const HandlePrint = (record) => {
    setShowPrint((previouse) => !previouse);
  };

  // handle print

  return (
    <Box className="Header">
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
        onClick={() => Navigate(-1)}
      >
        Back
      </IconButton>

      {/* detail box */}
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
            startIcon={<DeleteIcon />}
            onClick={HandleDelete}
          >
            Delete
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
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAsPaid}
          >
            mark as paid
          </Button>
        </Box>
      </Box>
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* offence details */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ p: 1 }}>
                Offence Date{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Number Plate{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Driver Licen Number{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Offence Commited{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Offence Description{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Charge Amount{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Amount Paid
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Amount Left{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Payment Status{" "}
              </Typography>
              <Typography variant="h6" sx={{ p: 1 }}>
                Location of Offence{" "}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Offence Date{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                Number Plate{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                Driver Licen Number{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Offence Commited{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Offence Description{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Charge Amount{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Amount Paid
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Amount Left{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Payment Status{" "}
              </Typography>
              <Typography sx={{ color: color.grey[200], p: 1 }}>
                {" "}
                : Location of Offence{" "}
              </Typography>
            </Box>
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
              Officer who conduct this transaction
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
                  {" "}
                  : Location of Offence{" "}
                </Typography>
                <Typography sx={{ color: color.grey[200], p: 1 }}>
                  {" "}
                  : Officer Rank{" "}
                </Typography>
                <Typography sx={{ color: color.grey[200], p: 1 }}>
                  {" "}
                  : Police Station{" "}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
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
            onClick={() => Navigate(`/invoice/${id}`)}
          >
            View Invoice
          </Button>
        </Box>
      </Box>
      {/* {showprint && <PritTickets />} */}
    </Box>
  );
};

export default TransactionView;