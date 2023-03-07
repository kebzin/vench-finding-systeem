import { Image } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  colors,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { tokens } from "../../theme";
import undraw_books_re_8gea from "../../assets/illustration/undraw_books_re_8gea.svg";
import { height } from "@mui/system";

const notificatio = [{}];

const Notification = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const status = "admin";
  const Navigate = useNavigate();
  return (
    <Box>
      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Notifications"
            subtitle="This page Contains all the notificationn you receive so far "
          />
        </Box>
        <ButtonBase
          onClick={() => Navigate(-1)}
          sx={{ p: 1, background: color.redAccent[400], mb: 1 }}
        >
          Go back
        </ButtonBase>
        <Box
          className="transition"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(310px, 1fr));"
          gridAutoRows="auto"
          gap="20px"
        >
          {/* map throufht the botification */}
          <>
            {notificatio.length > 0 ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    m: "auto",
                    textAlign: "center",
                    mt: 5,
                  }}
                >
                  <img
                    style={{ width: "50%", height: "100%" }}
                    src={undraw_books_re_8gea}
                  />
                </Box>
                <Typography textAlign="center" marginTop="1rem">
                  Ooops no notification avelabee yet.
                </Typography>
              </Box>
            ) : (
              notificatio.map((item, index) => (
                <Box
                  sx={{
                    backgroundColor: color.primary[400],
                    borderRadius: ".7rem",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      width: "100%",
                    }}
                  >
                    <Typography variant="h3">From</Typography>
                    <Typography>Kebba waiga</Typography>
                    <Typography>2 days ago</Typography>
                  </Box>
                  <Typography sx={{ color: color.greenAccent[500] }}>
                    Adminstrator
                  </Typography>

                  <Typography>
                    This page Contains all the notificationn you receive so fa
                    This page Contains all the notificationn you receive so fa
                    This page Contains all the notificationn you receive so fa
                    This page Contains all the notificationn you receive so fa
                  </Typography>
                </Box>
              ))
            )}
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
