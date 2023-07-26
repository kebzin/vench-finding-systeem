import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useStateContext } from "../../context/Contex";
import AddIcon from "@mui/icons-material/Add";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuthContext } from "../../context/AuthContex";
import { DataGrid } from "@mui/x-data-grid";

const Banka = () => {
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
  const [region, setRegion] = useState("");

  const { user } = useAuthContext();

  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const { data, error, isLoading, isFetching, isError, refetch } = useQuery(
    "bank",
    async () => {
      try {
        const response = await AxiousPrivate.get("/bank/bank");

        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch data.");
      }
    },
    {
      // refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: true, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: true,
    }
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
  }, [AxiousPrivate, user?.Officers?.role, refetch]);

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.post(`/bank/bank/`, newPost);
    },
    {
      onSuccess: (response) => {
        // Invalidate and refetch

        setLoading(false);
        seetCategoryAddShoe(false);
        setOPenDialog(true);
        setBonusShore(false);
        setCategoryName("");
        setDialogMessage(response?.data?.message);
        queryclient.invalidateQueries("bank");
      },

      onError: (error) => {
        setLoading(false);
        setOPenDialog(true);
        setErrorIcon(true);
        setDialogMessage(error?.response.data.message);
      },
    }
  );

  const DeleteMutation = useMutation(
    (newPost) => {
      return AxiousPrivate.delete(`/bank/bank/${newPost.id}`);
    },
    {
      onSuccess: (response) => {
        setOPenDialog(true);
        seetCategoryAddShoe(false);
        setDialogMessage(response?.data?.message);
        queryclient.invalidateQueries("bank");
      },

      onError: (error) => {
        setOPenDialog(true);
        setErrorIcon(true);
        setDialogMessage(error?.response.data.message);
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
        Bank: categoryName,
        Region: region,
        officerId: user?.Officers?.id,
      });
    } catch (error) {
      setLoading(false);
    }
  };
  const HandleCategoryDelete = async (id) => {
    try {
      DeleteMutation.mutate({
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },

    {
      field: "Bank",
      headerName: "Bank Name",
      flex: 1,
    },
    {
      field: "Region",
      headerName: "Region Name",
      flex: 1,
    },

    {
      field: "updatedAt",
      headerName: "Add at",
      flex: 1,
    },

    {
      field: "",
      headerName: "Delete",
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            // onClick={() => Navigate(`${id}`)}
            sx={{
              p: 1,
              cursor: "pointer",
              // color: colors.primary[700],
            }}
          >
            {" "}
            <Button
              sx={{
                mt: 2,
                color: color.redAccent[400],
              }}
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={(event) => HandleCategoryDelete(id)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h1"
        sx={{ color: color.blueAccent[200], fontSize: 13, fontWeight: 700 }}
      >
        Adde Bank
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
        Add Banks
      </Button>
      <Box>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: color.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              //   backgroundColor: colors.blueAccent[700],
              borderBottom: "1px solid gray",
            },
            "& .MuiDataGrid-virtualScroller": {
              //   backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid gray",
              //   backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {},
          }}
        >
          {/* {data?.length > 0 && ( */}
          {isLoading === true || isFetching === true || data.length < 0 ? (
            <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 15 }}>
              loading....{" "}
            </Typography>
          ) : (
            <DataGrid rows={data} columns={columns} editMode={"row"} />
          )}
          {/* )} */}
        </Box>
      </Box>

      {categoryAddShoe && (
        <FunctionToAddCategory
          region={region}
          setRegion={setRegion}
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
  region,
  setRegion,
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
            Add Banks
          </Typography>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Enter Bank  Name"
              variant="outlined"
              size="full"
              type="text"
              required="true"
              onChange={(event) => setCategoryName(event.target.value)}
              value={categoryName}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Bank Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              autoWidth
              label="Station Region"
            >
              <MenuItem value={"Banjul City Council"}>
                Banjul City Council{" "}
              </MenuItem>
              <MenuItem value={"Upper River Region"}>
                Upper River Region
              </MenuItem>
              <MenuItem value={"Lower River Region"}>
                Lower River Region
              </MenuItem>
              <MenuItem value={"Nort Bank Region"}> Nort Bank Region</MenuItem>
              <MenuItem value={"West Coast Region"}>West Coast Region</MenuItem>
              <MenuItem value={"Central River Region"}>
                Central River Region
              </MenuItem>
            </Select>
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
export default Banka;
