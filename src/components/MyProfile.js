import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useContext } from "react";
import Close from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useStateContext } from "../context/Contex";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/logout";
import { useAuthContext } from "../context/AuthContex";

const MyProfile = () => {
  const { HandleClickClose } = useStateContext();
  const Navigate = useNavigate();
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
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
                // theme.palette.mode === "dark" ? color.primary[400] : "white",
                color.primary[400],

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
        <Box
          sx={{
            p: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              textAlign: "center",
              fontSize: "20px",
              mt: 2,
            }}
          >
            User Profile
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 3,
              borderBottom: `1px solid ${color.grey[700]}`,
              pb: 2,
            }}
            onClick={() => Navigate(`/userprofile/${user?.Officers?.id}`)}
          >
            <Avatar
              sx={{ height: 60, width: 60, background: color.greenAccent[400] }}
            />
            <Box display="flex" flexDirection="column">
              <Typography variant="h3" fontSize={20}>
                {user?.Officers?.firstNme}
              </Typography>
              <Typography sx={{ color: color.grey[500], pt: 0.5 }}>
                {user?.Officers?.role}
              </Typography>
              <Typography sx={{ color: color.grey[500] }}>
                {user?.Officers?.email}
              </Typography>
            </Box>
          </Box>
          <Box></Box>
          <LoadingButton
            size="larger"
            color="primary"
            onClick={handleLogout}
            loading={false}
            loadingPosition="end"
            variant="contained"
            style={{ backgroundColor: "none" }}
            sx={{
              width: "100%",
              mt: 3,
              backgroundColor: color.greenAccent[600],
              "&:hover: backgroundColor": color.greenAccent[900],
            }}
          >
            <span style={{ padding: "10px" }}>LogOut</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
