import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { tokens } from "../theme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LoadingButton } from "@mui/lab";
import { useStateContext } from "../context/Contex";
import ErrorIcon from "@mui/icons-material/Error";

const PopUpMessage = ({ message }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  const { setOPenDialog, dialogMessage, errorIcon, setErrorIcon } =
    useStateContext();

  const HandleClick = () => {
    setOPenDialog(false);
    setErrorIcon(false);
  };
  function insertLineBreaks(text, maxLength) {
    const regex = new RegExp(`(.{1,${maxLength}})(\\s|$)`, "g");
    return text.replace(regex, "$1\n");
  }

  const BreakText = insertLineBreaks(dialogMessage, 50);
  return (
    <React.Fragment>
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
          left: "20%",
          borderRadius: 2,

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
        <Box
          sx={{
            padding: 5,
            textAlign: "center",
          }}
        >
          {errorIcon === true ? (
            <Typography sx={{ color: color.redAccent[500] }}>Error</Typography>
          ) : (
            <Typography sx={{ color: color.greenAccent[500] }}>
              Successed
            </Typography>
          )}
          {errorIcon === true ? (
            <ErrorIcon
              sx={{
                color: color.redAccent[500],
                textAlign: "center",
                fontSize: 70,
              }}
            />
          ) : (
            <CheckCircleIcon
              sx={{
                color: color.greenAccent[500],
                textAlign: "center",
                fontSize: 70,
              }}
            />
          )}
          <Typography>{BreakText}</Typography>
          <LoadingButton
            size="larger"
            color="primary"
            onClick={HandleClick}
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
            <span style={{ padding: "10px" }}>OK</span>
          </LoadingButton>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default PopUpMessage;
