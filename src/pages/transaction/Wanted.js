import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Header, WantedAdd } from "../../components";
import { tokens } from "../../theme";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ViewWanted from "../../components/ViewWanted";
import { useStateContext } from "../../context/Contex";
import { useAuthContext } from "../../context/AuthContex";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactTimeAgo from "react-time-ago";

const Wanted = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [preview, setPreview] = useState();
  const [showDetails, setShowDetails] = useState(false);

  const [addWanted, setAddWanted] = useState(false);

  // hooks
  const queryclient = useQueryClient();
  const Navigate = useNavigate();
  const AxiousPrivate = useAxiousPrivate();
  const { user } = useAuthContext();
  const { setDialogMessage, setOPenDialog, sidebarWidth } = useStateContext();

  const [isLoadingData, setIsLoadingData] = useState(true); // Set initial loading state to true

  // function to featch data:
  const { data, error, isFetching, isLoading, isError, refetch } = useQuery(
    "wanted",
    async () => {
      try {
        const response = await AxiousPrivate.get(`/wanted/wanted`);

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    },
    {
      refetchOnWindowFocus: false, // This will refetch data when the component comes into focus
      enabled: true, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: true,
    }
  );

  console.log(data);
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

  const column = [
    {
      field: "name",
      headerName: "Person Full Name",
      flex: 1,
    },

    {
      field: "age",
      headerName: "Person Age",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "crime", // this field is talking about the data
      headerName: "Wanted For",
      headerAlign: "left",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Problem Status",
      flex: 1,
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              color:
                status === "Pending"
                  ? colors.redAccent[400]
                  : status === "Completed"
                  ? colors.greenAccent[400]
                  : colors.blueAccent[400],
            }}
          >
            {status}
          </Typography>
        ); // payment status
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { createdAt } }) => {
        return (
          <Typography>
            <ReactTimeAgo date={Date.parse(createdAt)} />
            {/* {createdAt} */}
          </Typography>
        ); // number of fine mad by the user
      },
    },

    {
      field: "preview",
      headerName: "Preview",
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            onClick={() => Navigate(`${id}`)}
            sx={{
              background:
                theme.palette.mode === "light"
                  ? colors.blueAccent[800]
                  : colors.blueAccent[300],
              p: 1,
              cursor: "pointer",
              // color: colors.primary[700],
            }}
          >
            {" "}
            <Typography variant="h6">Preview</Typography>{" "}
          </Box>
        );
      },
    },
    user?.Officers?.role === "Administrator"
      ? {
          field: user?.Officers?.role === "Administrator" ? "" : null,
          headerName:
            user?.Officers?.role === "Administrator" ? "Delete" : null,
          renderCell: ({ row: { id, officerId } }) => {
            return user?.Officers?.role === "Administrator" ? (
              <Box
                sx={{
                  p: 1,
                  cursor: "pointer",
                }}
              >
                {" "}
                <Button
                  sx={{
                    mt: 2,
                    color: colors.redAccent[400],
                  }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={(event) => HandleDelete(id, event, officerId)}
                >
                  Delete
                </Button>
              </Box>
            ) : null;
          },
        }
      : {},
  ];
  //  Handle wanted person delete mutation
  const DeleteMutation = useMutation(
    ({ id, officerId }) => {
      return AxiousPrivate.delete(`/wanted/wanted/${id}`, {
        data: { officerId },
      });
    },
    {
      onSuccess: (res) => {
        setOPenDialog(true);

        setDialogMessage(res.data.message);
        queryclient.invalidateQueries("wanted");
      },

      onError: (error) => {
        setOPenDialog(true);
        setDialogMessage(error.message);
      },
    }
  );
  // Handle delete wanted person
  const HandleDelete = (id, event, officerId) => {
    try {
      DeleteMutation.mutate({
        id: id,
        officerId: officerId?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "20px;",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Wanted" subtitle="" />
      </Box>
      <Box>
        {user?.Officers?.role === "Administrator" ||
        user?.Officers?.role === "Sub Admin" ? (
          <IconButton
            sx={{
              right: 20,
              borderRadius: "5px",
            }}
            onClick={() => setAddWanted((previouseState) => !previouseState)}
          >
            <Chip
              sx={{
                float: "right",
                borderRadius: "5px",
                fontSize: 15,
                color: colors.greenAccent[500],
              }}
              label="Add wanted person"
              // onClick={handleClick}
              icon={<GroupAddIcon />}
            />
          </IconButton>
        ) : null}

        {addWanted && <WantedAdd setAddWanted={setAddWanted} />}
        {showDetails && (
          <ViewWanted preview={preview} setShowDetails={setShowDetails} />
        )}
      </Box>
      {/* <WantedAdd/> */}
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
              color: colors.greenAccent[300],
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
          ) : data?.length < 0 || data === undefined ? (
            []
          ) : (
            <DataGrid
              pagination
              rows={data
                ?.slice()
                ?.sort(
                  (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                )}
              columns={column}
              editMode={"row"}
            />
          )}
          {/* )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default Wanted;
