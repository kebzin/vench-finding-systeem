import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
  useTheme,
  TextareaAutosize,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import { Header } from "../../components";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { tokens } from "../../theme";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { border } from "@mui/system";

const UserProfile = () => {
  const [messageOpen, setMessageOpen] = useState(false);
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const status = "admin";

  // veriablw
  const Navigate = useNavigate();

  //  function
  const HandleMessageOPen = () => {
    return setMessageOpen((previouseState) => !previouseState);
  };
  return (
    <Box className="Header">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={status === "admin" ? "Kebba waiga" : "My Account "}
          subtitle={
            status === "admin"
              ? "You are viewing kebba waiga profile. This profile contain all the nessery information about this user. bear in min that whatever changes you made to this acccount will will affect this account"
              : "Welcom to you account kebba waiga. you account contain all the nessery information about you, such as the transaction you made , the fined you made "
          }
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
      <Box>
        <Box
          sx={{
            mt: 1,
            background: color.primary[400],
            p: 1,
          }}
        ></Box>
      </Box>
      {status === "admin" ? (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
        >
          <IconButton
            sx={{ borderRadius: 3, p: 2, backgroundColor: color.grey[700] }}
            title="Send Message"
            onClick={() => HandleMessageOPen()}
          >
            <ModeCommentIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      ) : undefined}
      {messageOpen && <SendMessage setMessageOpen={setMessageOpen} />}
    </Box>
  );
};

export default UserProfile;
const SendMessage = ({ setMessageOpen }) => {
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  // veriablw
  const Navigate = useNavigate();

  //  functions
  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setTimeout(() => {
        Navigate("");
        setLoading(false);
        window.alert("message send succesfully");
        setMessageOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 10,
        backgroundColor: color.primary[400],
        border: `1px solid ${
          theme.palette.mode === "dark" ? color.greenAccent[400] : undefined
        }`,
        p: 1,
        borderRadius: 2,
        minWidth: 400,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 900,
          mt: 2,
          mb: 2,
        }}
      >
        Send Message
      </Typography>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <TextareaAutosize
          placeholder="Type in here…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          minRows={10}
          outline={true}
        />
      </FormControl>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          mt: 2,
        }}
      >
        <LoadingButton
          size="larger"
          color="primary"
          onClick={{}}
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
          <span style={{ padding: "10px" }}>Cancel</span>
        </LoadingButton>
        <LoadingButton
          size="larger"
          color="primary"
          onClick={HandleSubmit}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{ mt: 1 }}
          style={{
            backgroundColor: color.greenAccent[600],
            width: "100%",
            mt: 3,
          }}
        >
          <span style={{ padding: "10px" }}>send Message</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};
