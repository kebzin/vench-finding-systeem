import { useTheme } from "@emotion/react";
import { Avatar, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";

const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
    accountStatus: "pending",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
    accountStatus: "suspended",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
    accountStatus: "active",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
    accountStatus: "suspended",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
    accountStatus: "pending",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
    accountStatus: "active",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
    accountStatus: "active",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
    accountStatus: "suspended",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
    accountStatus: "pending",
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
    accountStatus: "pending",
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
    accountStatus: "pending",
  },
];

const ManageUser = () => {
  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks
  const AxiousPrivate = useAxiousPrivate();

  // fet the user data
  // const { isLoading, data, error, refetch } = useQuery("user", async () => {
  //   try {
  //     const res = await AxiousPrivate.get("/officers/officers");
  //     res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  const { isLoading, data, error, refetch } = useQuery("users", async () => {
    try {
      return await AxiousPrivate.get("/officers/officers")
        .then((res) => res.data)
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(error);
    }
  });

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
            {status === "active" ? (
              <VerifiedUserIcon sx={{ color: colors.greenAccent[500] }} />
            ) : status === "pending" ? (
              <GppMaybeIcon sx={{ color: colors.blueAccent[500] }} />
            ) : (
              <GppBadIcon sx={{ color: colors.redAccent[400] }} />
            )}

            <Typography
              sx={{
                color:
                  status === "suspended"
                    ? colors.redAccent[400]
                    : status === "pending"
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
                  : status === "pending"
                  ? colors.blueAccent[400]
                  : colors.greenAccent[400],
            }}
          >
            {status}
          </Typography>
        );
      },
    },

    {
      field: "fines",
      headerName: "No of Fines",
      flex: 1,
      align: "center",
      renderCell: ({ row: { fines } }) => {
        return <Typography>{fines.length}</Typography>; // number of fine mad by the user
      },
    },
  ];

  return (
    <Box className="Header">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Manage Users"
          subtitle="Here are the list of all the avelable users, To see more information about a paticuler user click on them. "
        />
      </Box>
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
          {isLoading === true ? (
            "loading"
          ) : (
            <DataGrid
              pagination
              pageSize={10}
              rowsPerPageOptions={[5]}
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

export default ManageUser;
