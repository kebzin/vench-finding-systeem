import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CrimePrcing, Header } from "../../components";
import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DeleteIcon from "@mui/icons-material/Delete";
import BackupIcon from "@mui/icons-material/Backup";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import CrimePrcingUpdate from "../../components/CrimePrcingUpdate";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import fixing from "../../assets/illustration/fixing.svg";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

const Pricing = () => {
  const { user, setUser } = useAuthContext();
  const [updateitem, setupdateitem] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const {
    setToggleAdd,
    toggleAdd,
    setDialogMessage,
    setOPenDialog,
    sidebarWidth,
  } = useStateContext();

  // states
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const status = "admin";

  // hooks
  const Navigate = useNavigate();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const [isLoadingData, setIsLoadingData] = useState(true); // Set initial loading state to true

  // functions

  const { data, error, isLoading, isError, refetch } = useQuery(
    "Price",
    async () => {
      try {
        const response = await AxiousPrivate.get("/price/prices");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: false, // We don't want to fetch data immediately when the component mounts
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

  const mutation = useMutation(
    (newPost) => {
      console.log(newPost);
      return AxiousPrivate.delete(`/price/prices/${newPost.id}`, newPost);
    },
    {
      onSuccess: () => {
        setOPenDialog(true);
        setDialogMessage("New Price have been successfully deleted");
        queryclient.invalidateQueries("Price");
      },
    }
  );
  // handle submit function
  const HandleDelet = async (id) => {
    try {
      await mutation.mutate({
        AdminID: user.Officers.id,
        id: id,
      });
    } catch (error) {
      console.log(error.message);
      // setLoading(false);
      // setError(error.message);
    }
  };

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
  }
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
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

  const HandleUpdate = (item) => {
    setUpdateOpen(true);
    setupdateitem(item);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
          transition: " all 1s",
          marginRight: "15px;",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Pricing Page"
            subtitle="Welcome to the comprehensive page containing all the prices for each crime or violation of the rules. Whether you're new to the system or just want to stay informed, this page is your go-to resource to access the complete list of fine prices. Keep yourself updated with the latest information and penalties effortlessly."
          />
        </Box>
        <Box
          className="transition"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(310px, 1fr));"
          gridAutoRows="190px"
          gap="20px"
        >
          {/* ROW 1 */}

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
          ) : data?.length < 0 || data === undefined ? (
            []
          ) : (
            data.map((item, index) => (
              <Box
                backgroundColor={color.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="auto"
                key={index}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    m: "0 20px",
                  }}
                >
                  <Box
                    sx={{
                      objectFit: "contain",
                    }}
                  >
                    <IconButton
                      sx={{ fontSize: 100, color: color.greenAccent[400] }}
                    >
                      {item?.OffenceCategory === "car" ? (
                        <DirectionsCarFilledIcon sx={{ fontSize: 100 }} />
                      ) : item?.OffenceCategory === "truck" ? (
                        <FireTruckIcon sx={{ fontSize: 100 }} />
                      ) : item?.OffenceCategory === "bus" ? (
                        <DirectionsBusIcon sx={{ fontSize: 100 }} />
                      ) : item?.OffenceCategory === "motoBick" ? (
                        <TwoWheelerIcon sx={{ fontSize: 100 }} />
                      ) : (
                        <TwoWheelerIcon sx={{ fontSize: 100 }} />
                      )}
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {item?.OffenceName}
                    </Typography>
                    <Typography>
                      priceng
                      <Typography
                        variant="h1"
                        sx={{ fontSize: 15, color: color.greenAccent[400] }}
                      >
                        GMD{item?.OffencePrice}
                      </Typography>
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Typography>{"Category"}</Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: color.greenAccent[400],
                      }}
                    >
                      {item?.OffenceCategory}
                    </Typography>
                    {user?.Officers?.role === "Employee" ? null : (
                      <Button
                        sx={{
                          mt: 2,
                          color: color.redAccent[400],
                        }}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => HandleDelet(item.id)}
                      >
                        Delete
                      </Button>
                    )}
                    {user?.Officers?.role === "Employee" ? null : (
                      <Button
                        sx={{
                          mt: 1,
                          color: color.greenAccent[400],
                        }}
                        variant="outlined"
                        startIcon={<BackupIcon />}
                        onClick={() => HandleUpdate(item)}
                      >
                        update
                      </Button>
                    )}
                  </Box>
                </Box>
                {/* <CrimePrcingUpdate /> */}
              </Box>
            ))
          )}
        </Box>
      </Box>
      {/* {<PopUpMessage message={"your request have been succesfully added"} />} */}
      <Box>
        {/* add botten */}
        {toggleAdd && <CrimePrcing />}
        {user?.Officers?.role === "Employee" ? null : (
          <Box
            sx={addButtonContainer}
            onClick={() => setToggleAdd((previousestate) => !previousestate)}
          >
            <IconButton sx={{ p: 3 }}>
              <AddCircleRoundedIcon sx={{ fontSize: 44 }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {updateOpen && (
        <CrimePrcingUpdate
          updateitem={updateitem}
          setUpdateOpen={setUpdateOpen}
        />
      )}
    </React.Fragment>
  );
};

export default Pricing;
