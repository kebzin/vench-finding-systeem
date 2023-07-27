import { useTheme } from "@emotion/react";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { DataGrid, enUS } from "@mui/x-data-grid";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ReactTimeAgo from "react-time-ago";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import AddTeller from "./AddTellers";

import { useStateContext } from "../../context/Contex";

import { useAuthContext } from "../../context/AuthContex";

const ManageTellers = () => {
  const [adddTeller, setAddTeller] = useState();
  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setDialogMessage, setOPenDialog, setErrorIcon, sidebarWidth } =
    useStateContext();
  const { user } = useAuthContext();

  // hooks
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const { isLoading, data, isError, error, refetch, isFetching } = useQuery(
    "teller",
    async () => {
      try {
        return await AxiousPrivate.get("/teller/teller")
          .then((res) => res.data)
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(error);
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: true,
    }
  );

  const mutation = useMutation(
    (newPost) => {
      console.log(newPost);
      return AxiousPrivate.delete(`/teller/${newPost.id}`, newPost);
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
            background: colors.greenAccent[500],
            color: colors.redAccent[500],
            p: 2,
          }}
          onClick={() => refetch()}
        >
          Refetch data
        </Button>
      </Box>
    );
  }

  // const sortedData = data?.sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  // delete user mutation

  const HandleDelete = ({ _id }) => {
    try {
      mutation.mutate({
        id: _id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "_id", headerName: "NO" },
    {
      field: "User",
      headerName: "Teller",
      flex: 2,
      cursor: "pointer",

      headerAlign: "left",
      renderCell: ({ row: { firstName, lastName, Email, _id } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => Navigate(`/tellers/${_id}`, { data: data })}
          >
            <Avatar
              title={firstName}
              sx={{
                // setting the background bason the first letter of you name
                backgroundColor: colors.greenAccent[500],
                cursor: "pointer",
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: colors.grey[300],
                  ml: 1,
                }}
              >
                {firstName + " " + lastName}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: colors.grey[300],
                  ml: 1,
                  fontStyle: "italic",
                  fontSize: "12px",
                  color: colors.greenAccent[400],
                }}
              >
                {Email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "PhoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },

    {
      field: "status", // this field is talking about the data
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            {status === "Active" ? (
              <VerifiedUserIcon sx={{ color: colors.greenAccent[500] }} />
            ) : (
              <GppBadIcon sx={{ color: colors.redAccent[400] }} />
            )}
            <Typography
              variant="h6"
              sx={{
                fontSize: "12px",
                color:
                  status === "Suspended"
                    ? colors.redAccent[400]
                    : colors.greenAccent[400],
              }}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "createdAt",
      headerName: "Join At",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { createdAt } }) => {
        return (
          <Typography>
            <ReactTimeAgo date={createdAt} />
          </Typography>
        ); // number of fine mad by the user
      },
    },

    {
      field: "fines",
      headerName: "Preview",
      flex: 1,
      marginl: 30,
      align: "center",
      renderCell: ({ row: { _id } }) => {
        return (
          <Box
            onClick={() => Navigate(`/tellers/${_id}`)}
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
            <Typography variant="h6">Preview</Typography>{" "}
          </Box>
        );
      },
    },

    {
      field: "Delete", // this field is talking about the data
      headerName: "Delete",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { _id } }) => {
        return (
          <Box>
            {
              <Button
                sx={{
                  color: colors.redAccent[400],
                }}
                variant="outlined"
                startIcon={<DeleteForeverIcon />}
                onClick={() => HandleDelete({ _id })}
              ></Button>
            }
          </Box>
        );
      },
    },
  ];
  // Define the rowsPerPageOptions array with the desired page size options
  const rowsPerPageOptions = [10, 25, 50, 100]; // Add 50 to the array

  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "15p;",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Manage Tellers"
          subtitle="Below is the comprehensive list of our proficient tellers who possess the necessary expertise to adeptly handle the payment process at our esteemed bank."
        />
      </Box>
      <Button
        sx={{
          mt: 1,
          ml: 3,

          color: colors.greenAccent[400],
        }}
        variant="outlined"
        startIcon={<GroupAddIcon />}
        onClick={() => setAddTeller((prev) => !prev)}
      >
        Add Users
      </Button>
      {adddTeller && <AddTeller setAddeUsers={setAddTeller} />}
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
          {isLoading === true || isFetching === true ? (
            "loading"
          ) : (
            <DataGrid
              pagination
              pageSize={50}
              rowsPerPageOptions={rowsPerPageOptions}
              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageTellers;
