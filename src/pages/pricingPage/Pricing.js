import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CrimePrcing, Header, PopUpMessage } from "../../components";
import { tokens } from "../../theme";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DeleteIcon from "@mui/icons-material/Delete";
import BackupIcon from "@mui/icons-material/Backup";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../hooks/axious";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import CrimePrcingUpdate from "../../components/CrimePrcingUpdate";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import fixing from "../../assets/illustration/fixing.svg";
import { MarginTwoTone } from "@mui/icons-material";

const addButtonContainer = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  zindex: "10",
};

// const pricingDummData = [
//   {
//     name: "Wrong Paking",
//     price: 200,
//     icon: <DirectionsCarFilledIcon sx={{ fontSize: 100 }} />,
//   },
//   {
//     name: "Wrong Paking",
//     price: 250,
//     icon: <FireTruckIcon sx={{ fontSize: 100 }} />,
//   },
//   {
//     name: "Wrong Paking",
//     price: 50,
//     icon: <DirectionsBikeIcon sx={{ fontSize: 100 }} />,
//   },
//   {
//     name: "Wrong Paking",
//     price: 100,
//     icon: <TwoWheelerIcon sx={{ fontSize: 100 }} />,
//   },
//   {
//     name: "Wrong Paking",
//     price: 300,
//     icon: <DirectionsBusIcon sx={{ fontSize: 100 }} />,
//   },
// ];

//

const Pricing = () => {
  const { user, setUser } = useAuthContext();
  const [updateitem, setupdateitem] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const { setToggleAdd, toggleAdd, setDialogMessage, setOPenDialog } =
    useStateContext();

  // effect on component mount
  useEffect(() => {
    const isMounted = true;
    const controllers = new AbortController();
  }, []);

  // states
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const status = "admin";

  // hooks
  const Navigate = useNavigate();
  const Location = useLocation();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  // functions
  const { error, isLoading, data, refetch } = useQuery("Price", () =>
    AxiousPrivate.get("/price/prices")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        navigator("/login", { status: { from: Location }, replace: true });
      })
  );

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

  const HandleUpdate = (item) => {
    setUpdateOpen(true);
    setupdateitem(item);
  };
  return (
    <React.Fragment>
      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Pricing Page"
            subtitle="This page contain all the price about each crime, or violation of the rule. Incase if you are new to the system you can visisted this page   frequently to see the liste of fine prices "
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
