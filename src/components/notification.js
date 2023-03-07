import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useContext } from "react";
import Close from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useStateContext } from "../context/Contex";
import { useNavigate } from "react-router-dom";

const notification = [
  {
    id: 1,
    name: "kebba waiga",
    message: "We Notice that You throught this past month you are not doing...",
    loginAuthentication: "Adminstrator",
  },
  {
    id: 1,
    name: "kebba waiga",
    message: "We Notice that You throught this past month you are not doing...",
    loginAuthentication: "Adminstrator",
  },
];

const Notification = () => {
  const { currentUser, HandleClickClose } = useStateContext();
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  return (
    <Box
      className="MyProfileBox"
      sx={{
        position: "fixed",
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
        <Box>
          <IconButton
            onClick={() => HandleClickClose("notification")}
            title="Close"
            sx={{
              position: "absolute",
              right: "-15px",
              top: "-20px",
              backgroundColor:
                theme.palette.mode === "dark" ? color.primary[400] : "white",

              borderRadius: ".7rem",
              boxShadow:
                theme.palette.mode === "dark"
                  ? color.primary[400]
                  : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              border: `1px solid ${color.greenAccent[400]}`,
            }}
          >
            <Close sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: "20px",
            mt: 2,
            textAlign: "center",
            fontWeight: 900,
          }}
        >
          Recent Notifications
        </Typography>
        <Box sx={{ p: 1 }}>
          {notification.map((item, index) => (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 4,
                  cursor: "pointer",
                }}
                onClick={() => {
                  Navigate(`/notification`);
                  HandleClickClose("notification");
                }}
              >
                <Avatar />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* adminstrator name */}
                  <Typography variant="h3" sx={{ fontSize: 20 }}>
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: color.grey[500],
                    }}
                  >
                    {item.loginAuthentication}
                  </Typography>
                  <Typography
                    sx={{
                      color: color.grey[600],
                    }}
                  >
                    {item.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
