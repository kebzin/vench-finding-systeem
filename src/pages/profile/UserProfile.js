import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
  useTheme,
  TextareaAutosize,
  Switch,
  Avatar,
  Button,
  FormControlLabel,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Header } from "../../components";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { tokens } from "../../theme";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ProfileChart from "./ProfileChart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PieChart from "./UserProfilePieChart";
import { useQuery } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import fixing from "../../assets/illustration/fixing.svg";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";

const UserProfile = () => {
  const [messageOpen, setMessageOpen] = useState(false);
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const status = "admin";
  const { id } = useParams();

  // states
  const [role, setRole] = useState(false);
  const [accountStatus, setAccountStatus] = useState(true);
  const [emailVerify, setEvailVerify] = useState(false);
  const [emailVerifyText, setEvailVerifyText] = useState("");
  const [accountStatusText, setAccountStatusText] = useState(true);
  const [AdminstratorStatus, setAdminstratorStatus] = useState(false);
  const [AdminstratorStatusText, setAdminstratorStatusText] = useState(false);

  // fetch the users datat
  const AxiousPrivate = useAxiousPrivate();

  const { isLoading, data, error, refetch } = useQuery("user", async () => {
    return await AxiousPrivate.get(`/officers/officers/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        return error.message;
      });
  });
  // const hello = 'kebba'
  // hello.charAt

  console.log(data);
  // veriablw
  const Navigate = useNavigate();

  //  function
  const HandleMessageOPen = () => {
    return setMessageOpen((previouseState) => !previouseState);
  };

  const HanleAccountChange = (event) => {
    setAccountStatus(event.target.checked);
    setAccountStatusText(accountStatus === true ? "Active" : "Suspended");
  };
  const HandleEmailVerify = (event) => {
    setEvailVerify(event.target.checked);
    setEvailVerifyText(emailVerify === true ? "Verifyed" : "Not Verifyed");
  };
  const HandleAdminstrator = (event) => {
    setAdminstratorStatus(event.target.checked);
    setAdminstratorStatusText(
      AdminstratorStatus === true ? "Administrator" : "Client"
    );
  };
  return (
    <Box className="Header">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={"Profile"} />
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
      {/* // */}

      {error ? (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img style={{ width: "50%", marginTop: "20rem" }} src={fixing} />
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
      ) : isLoading ? (
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
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              marginTop: 5,
            }}
          >
            <Box
              className="ProfileDetails"
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* profile infor */}
              <Box
                sx={{
                  background: color.primary[400],

                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 20, mb: 1, ml: 2, pt: 2 }}
                >
                  Profile Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{}}>
                    <Avatar
                      sx={{
                        minWidth: 120,
                        minHeight: 120,
                        background: color.blueAccent[100],
                        fontWeight: 700,
                        fontSize: 23,
                      }}
                    >
                      {data?.firstName?.charAt(0) +
                        "" +
                        data?.lastName?.charAt(0)}
                    </Avatar>
                    <Typography sx={{ p: 1, fontSize: 18 }}>
                      {data?.firstName + " " + data?.lastName}
                    </Typography>
                    {/* <Typography sx={{}}>Role: Client</Typography> */}
                    <LoadingButton
                      sx={{
                        width: "100%",
                        mb: 1,
                        background:
                          theme.palette.mode === "dark"
                            ? color.greenAccent[700]
                            : color.greenAccent[500],
                        "&:hover": { background: color.greenAccent[500] },
                      }}
                      onClick={{}}
                    >
                      <span style={{}}>Message</span>
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  background: color.primary[400],
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 20, mb: 1, ml: 1, pt: 2 }}
                >
                  About
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <MilitaryTechIcon />
                  </IconButton>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Rank:{" "}
                    <Typography sx={{ ml: 1, color: color.blueAccent[300] }}>
                      Trafic Officer
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <LocationOnIcon />
                  </IconButton>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Live in:{" "}
                    <Typography sx={{ ml: 1, color: color.blueAccent[300] }}>
                      Trafic Officer
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <AssuredWorkloadIcon />
                  </IconButton>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Work at:{" "}
                    <Typography sx={{ ml: 1, color: color.blueAccent[300] }}>
                      {data?.PoliceStation}
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <LocalPhoneIcon />
                  </IconButton>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Phone Number:{" "}
                    <Typography sx={{ ml: 1, color: color.blueAccent[300] }}>
                      +220 {data?.PhoneNumber}
                    </Typography>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  background: color.primary[400],
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{ fontWeight: 600, fontSize: 17, mb: 1, ml: 1, pt: 2 }}
                >
                  Account Status
                </Typography>
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Account Status</Typography>
                    <Switch
                      color="secondary"
                      checked={accountStatus}
                      onChange={(event) => HanleAccountChange(event)}
                      sx={{}}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Verify Email</Typography>
                    <Switch color="secondary" onChange={HandleEmailVerify} />
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1 }}
                  >
                    <Typography>Active account</Typography>
                    <Switch color="secondary" onChange={HandleAdminstrator} />
                  </Stack>
                </Box>
              </Box>
            </Box>

            <Box
              className="FineImade"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: "75%",
                gap: 1,
              }}
            >
              {/* transaction info */}

              {/* chat */}
              <Box
                sx={{
                  background: color.primary[400],
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Box>
                  <ProfileChart />
                </Box>
              </Box>

              <Box
                // className="Colum"
                display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(325px, 1fr));"
                gridAutoRows="140px"
                gap="20px"
                // sx={{
                //   display: "flex",
                //   alignItems: "center",
                //   flexWrap: "wrap",
                //   gap: 1,
                // }}
              >
                <Box
                  sx={{
                    background: color.primary[400],
                    p: 1,
                    flex: 1,
                    borderRadius: 1,
                    p: 2,
                    borderBottom: `2px solid ${color.greenAccent[200]}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                      {"500"}
                    </Typography>
                    <LocalMallIcon sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 20,
                      mt: 3,
                    }}
                  >
                    Number Of Fine I Made
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: color.primary[400],
                    p: 1,
                    flex: 1,
                    borderRadius: 1,
                    p: 2,
                    borderBottom: `2px solid ${color.greenAccent[200]}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                      {"500"}
                    </Typography>
                    <LocalMallIcon sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 20,
                      mt: 2,
                    }}
                  >
                    Number of messaiga I received
                  </Typography>
                  <IconButton
                    sx={{
                      borderRadius: 2,
                      // background: color.redAccent[100],
                      color: color.greenAccent[600],
                    }}
                  >
                    <Typography>View Messages</Typography>
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    background: color.primary[400],
                    p: 1,
                    flex: 1,
                    borderRadius: 1,
                    borderBottom: `2px solid ${color.greenAccent[200]}`,
                  }}
                >
                  <Box>
                    <Typography>GMD: {"500"}</Typography>
                    <Typography
                      sx={{
                        fontSize: 20,
                        mt: 2,
                      }}
                    >
                      Total Earning from Bonuses
                    </Typography>

                    <LoadingButton
                      sx={{
                        // width: "100%",
                        mb: 1,
                        mt: 2,
                        float: "right",
                        background:
                          theme.palette.mode === "dark"
                            ? color.greenAccent[600]
                            : color.greenAccent[500],
                        "&:hover": { background: color.greenAccent[500] },
                      }}
                      onClick={{}}
                    >
                      <span style={{}}>Print Recit</span>
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    background: color.primary[400],
                  }}
                >
                  <PieChart />
                </Box>
              </Box>
            </Box>
          </Box>

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
        </Box>
      )}
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
