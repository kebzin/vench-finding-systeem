import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import BackupIcon from "@mui/icons-material/Backup";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useStateContext } from "../../context/Contex";
import AddIcon from "@mui/icons-material/Add";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import fixing from "../../assets/illustration/fixing.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import { useAuthContext } from "../../context/AuthContex";

const Category = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  //   state
  const [bonusShore, setBonusShore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bonus, setBonus] = useState();
  const { setDialogMessage, setOPenDialog, setErrorIcon } = useStateContext();
  const [categoryName, setCategoryName] = useState("");
  const [categoryAddShoe, seetCategoryAddShoe] = useState(false);
  const [addcatLoading, setAddCatLoading] = useState(false);

  const { user } = useAuthContext();
  const HandleBonushShow = () => {
    setBonusShore((prev) => !prev);
  };
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const { data, error, isLoading, isError, refetch } = useQuery(
    "category",
    async () => {
      try {
        const response = await AxiousPrivate.get("/category/category");
        console.log(response);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data.");
        console.log(error);
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: false, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: false,
    }
  );

  console.log(data);
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
  }, [AxiousPrivate, user?.Officers?.role, refetch]);

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.post(`/category/category/`, newPost);
    },
    {
      onSuccess: (response) => {
        // Invalidate and refetch
        console.log(response);
        setLoading(false);
        setOPenDialog(true);
        setBonusShore(false);
        setCategoryName("");
        setDialogMessage("Category successfully Add");
        queryclient.invalidateQueries("category");
      },

      onError: (error) => {
        setLoading(false);
        setOPenDialog(true);
        setErrorIcon(true);
        setDialogMessage(error?.response.data.mesage);
      },
    }
  );

  if (isLoading) {
    return (
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
    );
  }
  if (isError) {
    return (
      <Box>
        <Typography>{error.message}</Typography>
      </Box>
    );
  }

  //   const handle bonus update
  const HandleCategoryAdd = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await mutation.mutate({
        bonus: bonus,
        officerId: user?.Officers?.id,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const da = [{}, {}, {}];
  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h1"
        sx={{ color: color.blueAccent[200], fontSize: 20, fontWeight: 700 }}
      >
        Adde Category
      </Typography>
      <Typography sx={{ color: color.grey[500] }}>
        Example of category truck, car, bus etc
      </Typography>

      {/* add category button */}
      <Button
        sx={{
          mt: 1,
          color: color.greenAccent[400],
          mb: 3,
          border: `1px solid ${color.grey[500]}`,
        }}
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => seetCategoryAddShoe((prev) => !prev)}
      >
        Add Category
      </Button>
      <Box sx={{ mt: 5 }}>
        <Typography sx={{ fontSize: 25, fontWeight: 400 }}>
          Bonus Amount per fine
        </Typography>
        <Typography sx={{ color: color.redAccent[400] }} variant="h4">
          GMD{"20"}
        </Typography>
        <Button
          sx={{
            mt: 1,
            color: color.greenAccent[400],
            border: `1px solid ${color.grey[500]}`,
          }}
          variant="outlined"
          startIcon={<BackupIcon />}
          onClick={HandleBonushShow}
        >
          update
        </Button>
      </Box>

      <Box
        className="transition"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr));"
        gridAutoRows="180px"
        gap="20px"
      >
        {/* ROW 1 */}

        {/* {loading ? (
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
              //   onClick={() => refetch()}
            >
              Refresh
            </Button>
          </Box> */}
        {da.map((item, index) => (
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
                display: "flex",
                width: "100%",
                m: "0 20px",
              }}
            >
              <Box
                sx={{
                  objectFit: "contain",
                }}
              >
                <Typography>category</Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: color.blueAccent[200] }}
                >
                  {"Car"}
                </Typography>
                <IconButton
                  sx={{ fontSize: 100, color: color.greenAccent[400] }}
                >
                  {/* {item?.OffenceCategory === "car" ? (
                      <DirectionsCarFilledIcon sx={{ fontSize: 100 }} />
                    ) : item?.OffenceCategory === "truck" ? (
                      <FireTruckIcon sx={{ fontSize: 100 }} />
                    ) : item?.OffenceCategory === "bus" ? (
                      <DirectionsBusIcon sx={{ fontSize: 100 }} />
                    ) : item?.OffenceCategory === "motoBick" ? (
                      <TwoWheelerIcon sx={{ fontSize: 100 }} />
                    ) : (
                      <TwoWheelerIcon sx={{ fontSize: 100 }} />
                    )} */}
                  <DirectionsCarFilledIcon sx={{ fontSize: 100 }} />
                </IconButton>
              </Box>
              <Box>
                <Button
                  sx={{
                    mt: 2,
                    color: color.redAccent[400],
                  }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  //   onClick={() => HandleDelet(item.id)}
                >
                  Delete
                </Button>

                <Button
                  sx={{
                    mt: 1,
                    color: color.greenAccent[400],
                  }}
                  variant="outlined"
                  startIcon={<BackupIcon />}
                  //   onClick={() => HandleUpdate(item)}
                >
                  update
                </Button>
              </Box>
            </Box>
            {/* <CrimePrcingUpdate /> */}
          </Box>
        ))}
      </Box>
      {bonusShore && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: ".7rem",
                height: "auto",
                background:
                  theme.palette.mode === "dark" ? color.primary[400] : "white",
                padding: 3,
                margin: "auto",

                boxShadow:
                  theme.palette.mode === "dark"
                    ? color.primary[400]
                    : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                border: `1px solid 
                ${
                  theme.palette.mode === "dark" ? color.greenAccent[400] : null
                }`,
              }}
            >
              <Typography variant="h3" sx={{ mb: 2 }}>
                Update Bunus
              </Typography>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Update Bonus"
                  variant="outlined"
                  size="full"
                  type="text"
                  required="true"
                  onChange={(event) => setBonus(event.target.value)}
                  value={bonus}
                />
              </FormControl>
              <LoadingButton
                size="larger"
                color="primary"
                // onClick={HandleBonusUpdate}
                loading={loading}
                //   loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: color.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>Update bunus</span>
              </LoadingButton>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={() => setBonusShore(false)}
                loading={false}
                //   loadingPosition="end"
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
            </Box>
          </Box>
        </Box>
      )}
      {categoryAddShoe && (
        <FunctionToAddCategory
          onHandleClick={HandleCategoryAdd}
          seetCategoryAddShoe={seetCategoryAddShoe}
          loading={addcatLoading}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
        />
      )}
    </Box>
  );
};

const FunctionToAddCategory = ({
  categoryName,
  setCategoryName,
  seetCategoryAddShoe,
  onHandleClick,
  loading,
}) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: ".7rem",
            height: "auto",
            background:
              theme.palette.mode === "dark" ? color.primary[400] : "white",
            padding: 3,
            margin: "auto",

            boxShadow:
              theme.palette.mode === "dark"
                ? color.primary[400]
                : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            border: `1px solid 
                ${
                  theme.palette.mode === "dark" ? color.greenAccent[400] : null
                }`,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Add Category
          </Typography>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Enter Category Name"
              variant="outlined"
              size="full"
              type="text"
              required="true"
              onChange={(event) => setCategoryName(event.target.value)}
              value={categoryName}
            />
          </FormControl>
          <LoadingButton
            size="larger"
            color="primary"
            onClick={onHandleClick}
            loading={loading}
            //   loadingPosition="end"
            variant="contained"
            sx={{ mt: 1 }}
            style={{
              backgroundColor: color.greenAccent[600],
              width: "100%",
              mt: 3,
            }}
          >
            <span style={{ padding: "10px" }}>Add Category</span>
          </LoadingButton>
          <LoadingButton
            size="larger"
            color="primary"
            onClick={() => seetCategoryAddShoe(false)}
            loading={false}
            //   loadingPosition="end"
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
        </Box>
      </Box>
    </Box>
  );
};
export default Category;
