import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
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

        <Box sx={{ p: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1 }}
          >
            <Typography sx={{ fontSize: 20 }}>
              New User AddCircleRoundedIcon
            </Typography>
            <Typography sx={{ color: color.greenAccent[400], mr: 3 }}>
              New
            </Typography>
          </Stack>
        </Box>
        <Divider />

        <Box sx={{ p: 1 }}>
          {notification.map((item, index) => (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  cursor: "pointer",
                }}
                onClick={() => {
                  Navigate(`/notification`);
                  HandleClickClose("notification");
                }}
              >
                <Avatar sx={{ background: color.greenAccent[500] }} />
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
              <Divider />
            </Box>
          ))}
        </Box>

        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1 }}
          >
            <Typography sx={{ fontSize: 20 }}>Notifications</Typography>
            <Typography sx={{ color: color.greenAccent[400], mr: 3 }}>
              New
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
