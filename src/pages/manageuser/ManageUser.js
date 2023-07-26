import { useTheme } from "@emotion/react";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { DataGrid, enUS } from "@mui/x-data-grid";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ReactTimeAgo from "react-time-ago";
import Adduser from "./Adduser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";

import { useStateContext } from "../../context/Contex";

import { useAuthContext } from "../../context/AuthContex";

// TimeAgo.addLocale("en");
// TimeAgo.addDefaultLocale("en-US");

// const mockDataContacts = [
//   {
//     id: 1,
//     name: "Jon Snow",
//     email: "jonsnow@gmail.com",
//     age: 35,
//     phone: "(665)121-5454",
//     address: "0912 Won Street, Alabama, SY 10001",
//     city: "New York",
//     zipCode: "10001",
//     registrarId: 123512,
//     accountStatus: "pending",
//   },
//   {
//     id: 2,
//     name: "Cersei Lannister",
//     email: "cerseilannister@gmail.com",
//     age: 42,
//     phone: "(421)314-2288",
//     address: "1234 Main Street, New York, NY 10001",
//     city: "New York",
//     zipCode: "13151",
//     registrarId: 123512,
//     accountStatus: "suspended",
//   },
//   {
//     id: 3,
//     name: "Jaime Lannister",
//     email: "jaimelannister@gmail.com",
//     age: 45,
//     phone: "(422)982-6739",
//     address: "3333 Want Blvd, Estanza, NAY 42125",
//     city: "New York",
//     zipCode: "87281",
//     registrarId: 4132513,
//     accountStatus: "active",
//   },
//   {
//     id: 4,
//     name: "Anya Stark",
//     email: "anyastark@gmail.com",
//     age: 16,
//     phone: "(921)425-6742",
//     address: "1514 Main Street, New York, NY 22298",
//     city: "New York",
//     zipCode: "15551",
//     registrarId: 123512,
//     accountStatus: "suspended",
//   },
//   {
//     id: 5,
//     name: "Daenerys Targaryen",
//     email: "daenerystargaryen@gmail.com",
//     age: 31,
//     phone: "(421)445-1189",
//     address: "11122 Welping Ave, Tenting, CD 21321",
//     city: "Tenting",
//     zipCode: "14215",
//     registrarId: 123512,
//     accountStatus: "pending",
//   },
//   {
//     id: 6,
//     name: "Ever Melisandre",
//     email: "evermelisandre@gmail.com",
//     age: 150,
//     phone: "(232)545-6483",
//     address: "1234 Canvile Street, Esvazark, NY 10001",
//     city: "Esvazark",
//     zipCode: "10001",
//     registrarId: 123512,
//     accountStatus: "active",
//   },
//   {
//     id: 7,
//     name: "Ferrara Clifford",
//     email: "ferraraclifford@gmail.com",
//     age: 44,
//     phone: "(543)124-0123",
//     address: "22215 Super Street, Everting, ZO 515234",
//     city: "Evertin",
//     zipCode: "51523",
//     registrarId: 123512,
//     accountStatus: "active",
//   },
//   {
//     id: 8,
//     name: "Rossini Frances",
//     email: "rossinifrances@gmail.com",
//     age: 36,
//     phone: "(222)444-5555",
//     address: "4123 Ever Blvd, Wentington, AD 142213",
//     city: "Esteras",
//     zipCode: "44215",
//     registrarId: 512315,
//     accountStatus: "suspended",
//   },
//   {
//     id: 9,
//     name: "Harvey Roxie",
//     email: "harveyroxie@gmail.com",
//     age: 65,
//     phone: "(444)555-6239",
//     address: "51234 Avery Street, Cantory, ND 212412",
//     city: "Colunza",
//     zipCode: "111234",
//     registrarId: 928397,
//     accountStatus: "pending",
//   },
//   {
//     id: 10,
//     name: "Enteri Redack",
//     email: "enteriredack@gmail.com",
//     age: 42,
//     phone: "(222)444-5555",
//     address: "4123 Easer Blvd, Wentington, AD 142213",
//     city: "Esteras",
//     zipCode: "44215",
//     registrarId: 533215,
//     accountStatus: "pending",
//   },
//   {
//     id: 11,
//     name: "Steve Goodman",
//     email: "stevegoodmane@gmail.com",
//     age: 11,
//     phone: "(444)555-6239",
//     address: "51234 Fiveton Street, CunFory, ND 212412",
//     city: "Colunza",
//     zipCode: "1234",
//     registrarId: 92197,
//     accountStatus: "pending",
//   },
// ];

const ManageUser = () => {
  const [addUsers, setAddeUsers] = useState();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setDialogMessage, setOPenDialog, setErrorIcon, sidebarWidth } =
    useStateContext();
  const { user } = useAuthContext();

  // hooks
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const { data, error, isLoading, isError, isFetching, refetch } = useQuery(
    "users",
    async () => {
      try {
        return await AxiousPrivate.get("/officers/officers")
          .then((res) => res.data)
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(error);
      }
    },

    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: false, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: true,
    }
  );

  const mutation = useMutation(
    (newPost) => {
      console.log(newPost);
      return AxiousPrivate.delete(
        `/deleteOfficers/${user?.Officers?.id}`,
        newPost
      );
    },
    {
      onSuccess: (respond) => {
        setOPenDialog(true);
        setDialogMessage(respond.data.message);
        // setLoading(false);
        queryclient.invalidateQueries("users");
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

  const filteredRows =
    data?.length < 0 || data === undefined
      ? []
      : data?.filter((row) => {
          if (user?.Officers?.role === "Administrator") {
            return true; // Show all records for administrators
          } else if (user?.Officers?.role === "Sub Admin") {
            return row.role !== "Administrator"; // Hide records with administrator role for sub-administrators
          }
          return false; // Default: Hide all other records
        });

  const sortedData =
    filteredRows?.length < 0 || filteredRows === undefined
      ? []
      : filteredRows?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

  // delete user mutation

  const HandleDelete = ({ _id, fines }) => {
    try {
      if (fines?.length > 0) {
        return (
          setErrorIcon(true),
          setOPenDialog(true),
          setDialogMessage(
            `This Account has ${fines.length} made fines . Deleting this Account will result in deleting all transaction related to this account `
          )
        );
      }
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
      headerName: "User",
      flex: 2,
      cursor: "pointer",

      headerAlign: "left",
      renderCell: ({ row: { firstName, lastName, email, _id } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => Navigate(`/userprofile/${_id}`, { data: data })}
          >
            <Avatar
              title={firstName}
              sx={{
                // setting the background bason the first letter of you name
                backgroundColor:
                  //   name.charAt(0) === "A" || // i wil com back to this
                  //   name.charAt(0) === "B" ||
                  //   name.charAt(0) === "C" ||
                  //   name.charAt(0) === "D"
                  // ? colors.greenAccent[300]
                  colors.greenAccent[500],
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
                {email}
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
      field: "name",
      headerName: "Verify",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { status } }) => {
        return (
          <Box display="flex" alignItems="center">
            {/* {status === "Active" ? (
              <VerifiedUserIcon sx={{ color: colors.greenAccent[500] }} />
            ) : status === "Pending" ? (
              <GppMaybeIcon sx={{ color: colors.blueAccent[500] }} />
            ) : (
              <GppBadIcon sx={{ color: colors.redAccent[400] }} />
            )} */}
            {status === "Active" ? (
              <VerifiedUserIcon sx={{ color: colors.greenAccent[500] }} />
            ) : status === "Pending" ? (
              <GppMaybeIcon sx={{ color: colors.blueAccent[500] }} />
            ) : (
              <GppBadIcon sx={{ color: colors.redAccent[400] }} />
            )}

            <Typography
              sx={{
                color:
                  status === "Suspended"
                    ? colors.redAccent[400]
                    : status === "Pending"
                    ? colors.blueAccent[400]
                    : colors.greenAccent[400],
                ml: 1,
              }}
            >
              Email
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status", // this field is talking about the data
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              color:
                status === "suspended"
                  ? colors.redAccent[400]
                  : status === "Active"
                  ? colors.greenAccent[400]
                  : colors.blueAccent[400],
            }}
          >
            {status}
          </Typography>
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
      headerName: "No of Fines",
      flex: 1,
      marginl: 30,
      align: "center",
      renderCell: ({ row: { fines } }) => {
        return <Typography>{fines.length}</Typography>; // number of fine mad by the user
      },
    },

    {
      field: "Delete", // this field is talking about the data
      headerName: "Delete",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { _id, fines, role } }) => {
        return (
          <Box>
            {
              <Button
                sx={{
                  color: colors.redAccent[400],
                }}
                variant="outlined"
                startIcon={<DeleteForeverIcon />}
                onClick={() => HandleDelete({ _id, fines })}
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
          title="Manage Users"
          subtitle="Here are the list of all the avelable users, To see more information about a paticuler user click on them. "
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
        onClick={() => setAddeUsers((prev) => !prev)}
      >
        Add Users
      </Button>
      {addUsers && <Adduser setAddeUsers={setAddeUsers} />}
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
              rows={sortedData}
              columns={columns}
              getRowId={(row) => row._id}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUser;
