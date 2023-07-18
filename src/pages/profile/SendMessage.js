import { Padding } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { tokens } from "../../theme";

const SendMEssage = ({ setMessage, data }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const { id } = useParams();

  // states
  const [Cancel, setCancel] = useState();
  const [MessageContent, setMessageContent] = useState("");

  const [loading, setLoading] = useState(false);

  //hooks
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  const { user } = useAuthContext();
  const { setDialogMessage, setOPenDialog, sidebarWidth } = useStateContext();

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.post(`/message/messages/${id}`, newPost);
    },
    {
      onSuccess: (res) => {
        setLoading(false);
        setOPenDialog(true);
        setDialogMessage(res.data.message);
        queryclient.invalidateQueries("message");
        setMessage(false);
      },

      onError: (err) => {
        setOPenDialog(true);
        setDialogMessage(err.message);
        setLoading(false);
      },
    }
  );

  // functios
  const HandleSubmit = () => {
    setLoading(true);
    mutation.mutate({
      SenderID: user?.Officers?.id,
      MessageContent: MessageContent,
      ReciverID: id,
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",

        height: "auto",
        top: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        justifyItems: "center",

        borderRadius: 2,

        zIndex: 100,

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
      <Box>
        {" "}
        <Box sx={{ p: 2 }}>
          {" "}
          <Typography sx={{ fontSize: 20, textAlign: "center" }}>
            Send Message
          </Typography>{" "}
          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <textarea
              onChange={(event) => setMessageContent(event.target.value)}
              value={MessageContent}
              style={{
                background: "inherit",
                Padding: 1,

                color: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
                textAlign: "inherit",
              }}
              rows={10}
            ></textarea>
          </FormControl>
          <LoadingButton
            sx={{
              width: "100%",
              mt: 2,
              background:
                theme.palette.mode === "dark"
                  ? color.greenAccent[700]
                  : color.greenAccent[500],
              "&:hover": { background: color.greenAccent[500] },
            }}
            onClick={HandleSubmit}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span style={{ padding: "10px" }}>Send Message</span>
          </LoadingButton>
          <LoadingButton
            sx={{
              width: "100%",
              mt: 2,
              background:
                theme.palette.mode === "dark"
                  ? color.greenAccent[700]
                  : color.greenAccent[500],
              "&:hover": { background: color.greenAccent[500] },
            }}
            onClick={() => setMessage((previousestate) => !previousestate)}
            // loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span style={{ padding: "10px" }}>Cancel</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SendMEssage;
