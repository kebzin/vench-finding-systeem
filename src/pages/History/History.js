import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { useStateContext } from "../../context/Contex";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { useNavigate } from "react-router-dom";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContex";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";

const History = () => {
  const { sidebarWidth } = useStateContext();
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  const Navigate = useNavigate();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const [isLoadingData, setIsLoadingData] = useState(true); // Set initial loading state to true

  // functions
  const { user } = useAuthContext();

  const { data, error, isLoading, isError, isFetching, refetch } = useQuery(
    "history",
    async () => {
      try {
        const response = await AxiousPrivate.get(`/teller/history`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: true, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: true,
    }
  );
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      setIsLoadingData(true); // Show loading message while fetching data
      try {
        await refetch(); // Fetch data using useQuery's refetch function
      } catch (error) {
        console.error(error);
      }
      setIsLoadingData(false); // Hide loading message after data fetching is done
    };

    // Fetch data when the component is mounted or when the dependencies (month, year, etc.) change
    fetchData();
  }, [AxiousPrivate, user?.Officers?.role, refetch]);

  if (isLoading) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            ml: 5,
          }}
        >
          <img width={"60%"} src={undraw_exams_re_4ios} />
          <Typography variant="h3">Loading data .......</Typography>
        </Box>
      </Box>
    );
  } else if (isError) {
    return (
      <Box>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Oops something wrong{" "}
        </Typography>
        <Typography>pleas try refetch the data manually </Typography>
        <Typography>Check your internet and try refreshing </Typography>
        <Typography>Error:: message {isError && error.message}</Typography>
        <Button
          sx={{
            background: color.greenAccent[500],
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

  const sortedData =
    data?.length < 0 || data === undefined
      ? []
      : data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "15px;",
      }}
    >
      <Header
        title={"Payment History"}
        subtitle={"This are the history of the payment you conduct "}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {isLoading || isFetching ? (
          <Typography>Loading</Typography>
        ) : (
          sortedData.map((element, index) => (
            <Box
              key={index}
              sx={{
                background: color.primary[400],
                padding: 2,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <IconButton
                sx={{
                  background: color.blueAccent[500],
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                {element?.TransactionID?.fineCategory === "Truck" ? (
                  <FireTruckIcon />
                ) : element?.TransactionID?.fineCategory === "Car" ? (
                  <AirportShuttleIcon />
                ) : (
                  <TwoWheelerIcon />
                )}
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: 2,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontSize: 18 }}>
                    Submit Payment: {element?.TransactionID?.NumberPlat}
                  </Typography>
                  <Typography variant="h5" sx={{ letterSpacing: 1 }}>
                    BY:{" "}
                    {element?.TellerID?.firstName +
                      " " +
                      element?.TellerID?.lastName}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    Category: {element?.TransactionID?.fineCategory}{" "}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    Bank: {element?.TellerID?.bankName}
                  </Typography>
                  <Typography sx={{ color: color.grey[300], fontSize: 18 }}>
                    {element?.createdAt}
                  </Typography>
                </Box>

                <Box>
                  <Divider color={color.greenAccent[500]} />
                  <Typography variant="h4">
                    GMD {element?.PaidAmount}
                  </Typography>
                  <Typography sx={{ color: color.greenAccent[400] }}>
                    Success
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() =>
                  Navigate(`/tellers/${element.id}`, { data: data })
                }
                sx={{
                  background: color.greenAccent[600],
                  borderRadius: 2,
                  p: 2,
                }}
              >
                View More
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default History;
