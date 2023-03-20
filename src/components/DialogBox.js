import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { tokens } from "../theme";
import { LoadingButton } from "@mui/lab";
import { useStateContext } from "../context/Contex";
import NotificationsIcon from "@mui/icons-material/Notifications";

const DialogBox = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  const { setToggleDelete, toggleDeleteMessage, setCallFunctions } =
    useStateContext();

  const HandleCancel = () => {
    setToggleDelete(false);
  };

  const HandleOk = () => {
    setToggleDelete(false);
    setCallFunctions(true);
  };

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
          <NotificationsIcon
            sx={{
              color: color.greenAccent[500],
              textAlign: "center",
              fontSize: 70,
            }}
          />
          <Typography>{toggleDeleteMessage}</Typography>
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
              onClick={HandleCancel}
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
              onClick={HandleOk}
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
      </Box>
    </React.Fragment>
  );
};

export default DialogBox;
