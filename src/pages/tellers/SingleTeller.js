import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/Contex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { tokens } from "../../theme";
import { Header } from "../../components";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import { useNavigate, useParams } from "react-router-dom";

const SingleTeller = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const { setDialogMessage, setOPenDialog, sidebarWidth, setErrorIcon } =
    useStateContext();

  //   state

  // hooks
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError, error, refetch } = useQuery(
    "teller",
    async () => {
      try {
        return await AxiousPrivate.get(`/teller/teller/${id}`)
          .then((res) => res.data)
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(error);
        console.log(error.status);
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: false, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: false,
    }
  );
  const [accountStatusChange, setAccountStatusChange] = useState(
    data?.status === "Active" ? true : false
  );
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        await refetch(); // Fetch data using useQuery's refetch function
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch data when the component is mounted or when the dependencies (month, year, etc.) change
    fetchData();
  }, [AxiousPrivate, refetch]);

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.patch(`/teller/teller/${id}`, { newPost });
    },
    {
      onSuccess: (respond) => {
        setOPenDialog(true);
        setDialogMessage(respond.data.message);
        // setLoading(false);
        queryclient.invalidateQueries("teller");
      },

      onError: (error) => {
        // setLoading(false);
        setOPenDialog(true);
        setErrorIcon(true);
        console.log("error", error.response);
        setDialogMessage(error.response.error);
      },
    }
  );

  if (isLoading) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",

            marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
            transition: " all 1s",
            marginRight: "15px",
          }}
        >
          <img width={"60%"} src={undraw_exams_re_4ios} />
          <Typography variant="h3">Loading data .......</Typography>
        </Box>
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
          transition: " all 1s",
          marginRight: "15px",
        }}
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Oops something wrong{" "}
        </Typography>
        <Typography>pleas try refetch the data manually </Typography>
        <Typography>Check your internet and try refreshing </Typography>
        <Typography>Error:: message {isError && error.message}</Typography>
        <Button
          sx={{
            background: color.greenAccent[600],
            color: color.redAccent[500],
            p: 2,
          }}
          onClick={() => refetch()}
        >
          Refetch data
        </Button>
      </Box>
    );
  }

  console.log(data);
  //   handle account status change
  const HanleAccountChange = async (event) => {
    event.preventDefault();
    setAccountStatusChange(event.target.checked);
    try {
      const UpdateTellerStatus = await AxiousPrivate.put(
        `/teller/teller/${id}`,
        {
          status: data?.status === "Active" ? "Suspende" : "Active",
        }
      );
      setOPenDialog(true);
      setDialogMessage(UpdateTellerStatus?.data.message);
    } catch (error) {
      console.log(error);
      setErrorIcon(true);
      setDialogMessage(error?.response?.error);
    }
  };
  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "15p;",
      }}
    >
      <Box>
        <Header
          title="Teller "
          subtitle="Configuring setting for other users"
        />
        <Button
          onClick={() => navigate(-1)}
          sx={{
            p: 2,
            background: color.redAccent[500],
            color: color.greenAccent[900],
          }}
        >
          Go Back
        </Button>
        <Box sx={{ mt: 3 }}>
          <Avatar
            sx={{ height: 100, width: 100, bgcolor: color.greenAccent[600] }}
          >
            {data?.lastName}
          </Avatar>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* teller details */}
            <Box
              sx={{
                flex: 2,

                mt: 2,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Teller First Name:
                </Typography>
                <Typography variant="h6" style={{ color: color.grey[600] }}>
                  {data?.firstName}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Teller Last Name:
                </Typography>
                <Typography variant="h6" style={{ color: color.grey[600] }}>
                  {data?.lastName}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Teller Gender:
                </Typography>
                <Typography variant="h6" style={{ color: color.grey[600] }}>
                  Male
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Teller Phone Number:
                </Typography>
                <Typography variant="h6" style={{ color: color.grey[600] }}>
                  {data?.PhoneNumber}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Work at :
                </Typography>
                <Typography variant="h6" style={{ color: color.grey[600] }}>
                  {data?.bankName}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Teller Name:
                </Typography>
                <Typography style={{ color: color.grey[600] }}>
                  {data?.firstName}
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                margin: "auto",
                display: "flex",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 15 }}>
                  Teller account Status
                </Typography>
                <Switch
                  color="secondary"
                  checked={accountStatusChange}
                  onChange={(event) => HanleAccountChange(event)}
                  sx={{}}
                  disabled={false}
                />
                <Typography
                  sx={{
                    color:
                      data?.status === "Active"
                        ? color.greenAccent[500]
                        : color.redAccent[500],
                  }}
                >
                  {data?.status}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SingleTeller;
