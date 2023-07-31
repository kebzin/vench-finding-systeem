import { Image } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { tokens } from "../../theme";
import undraw_books_re_8gea from "../../assets/illustration/undraw_books_re_8gea.svg";
import { useStateContext } from "../../context/Contex";
import { useAuthContext } from "../../context/AuthContex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useQuery, useQueryClient } from "react-query";
import fixing from "../../assets/illustration/fixing.svg";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import ReactTimeAgo from "react-time-ago";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Notification = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  const {
    setToggleAdd,
    toggleAdd,
    setDialogMessage,
    setOPenDialog,
    sidebarWidth,
  } = useStateContext();
  // get all my messages
  const { user } = useAuthContext();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  const { id } = useParams();

  // functions
  const { error, isLoading, data, refetch } = useQuery("message", (newPost) =>
    AxiousPrivate.get(
      user?.Officers?.role === "Administrator"
        ? `/message/messages/${user?.Officers?.id}`
        : `/message/messages/${id}`
    )
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        navigator("/login");
      })
  );

  useEffect(() => {
    const lastIndex = data?.length - 1;
    const result = data?.find((element, index) => index === lastIndex);

    // const HandleUpdateMessage = AxiousPrivate.put(`/message/messages/${id}`);
  }, [data]);

  return (
    <Box>
      <Box
        sx={{
          marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
          transition: " all 1s",
          marginRight: "15p;",
        }}
      >
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
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "column",
                mt: 40,
              }}
            >
              <img width={"60%"} src={undraw_exams_re_4ios} />
              <Typography variant="h3">Loading......</Typography>
            </Box>
          ) : error ? (
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                alt="Error fetching data"
                style={{ width: "50%", marginTop: "20rem" }}
                src={fixing}
              />
              <Typography variant="h4">OOPs Something Went wrong </Typography>
              <Button
                sx={{
                  mt: 2,
                  color: color.redAccent[400],
                }}
                variant="outlined"
                onClick={() => refetch()}
              >
                Refresh
              </Button>
            </Box>
          ) : (
            <>
              {data.length === 0 ? (
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
                      alt="loading resources"
                      style={{ width: "50%", height: "100%" }}
                      src={undraw_books_re_8gea}
                    />
                  </Box>
                  <Typography textAlign="center" marginTop="1rem">
                    Ooops no notification avelabee yet.
                  </Typography>
                </Box>
              ) : (
                data.map((item, index) => (
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
                      <Typography variant="h3">
                        {user?.Officers?.role === "Administrator"
                          ? "To :"
                          : "From"}
                      </Typography>
                      <Typography fontSize={20}>
                        {item?.officerId?.firstName +
                          " " +
                          item.officerId?.lastName}
                      </Typography>
                      <Typography>
                        <ReactTimeAgo date={item?.createdAt} />
                      </Typography>
                    </Box>
                    <Typography sx={{ color: color.greenAccent[500], mt: 2 }}>
                      {item?.officerId?.role}
                    </Typography>

                    <Typography fontSize={18}>
                      {item?.MessageContent}
                    </Typography>
                    <IconButton sx={{ float: "right" }}>
                      <DoneAllIcon
                        sx={{
                          color:
                            item?.view === true
                              ? color.greenAccent[500]
                              : "white",
                        }}
                      />
                    </IconButton>
                  </Box>
                ))
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
