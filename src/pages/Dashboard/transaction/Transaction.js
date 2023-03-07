import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Header } from "../../../components";
import { useAuthContext } from "../../../context/AuthContex";
import { tokens } from "../../../theme";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "BJL_5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    date: "1 days ago",
    registrarId: 123512,
    offence: "Wrong Paking",
    status: "Completed",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "BJL_2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    date: "1 days ago",
    registrarId: 123512,
    offence: "Assulting Officers",
    status: "pending",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "BJL_6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    date: "1 days ago",
    registrarId: 4132513,
    offence: "Over pricing passenger",
    status: "pending",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "BJL_6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    date: "1 days ago",
    registrarId: 123512,
    offence: "Violatio of trafic",
    status: "ongoing",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "BJL_1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    date: "5 days ago",
    registrarId: 123512,
    offence: "Wrong registration",
    status: "pending",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "BJL_6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    date: "1 days ago",
    registrarId: 123512,
    offence: "False Document",
    status: "ongoing",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "BJL_0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    date: "3 days ago",
    registrarId: 123512,
    offence: "Cause Accident",
    status: "pending",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "BJL_5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    date: "5 days ago",
    registrarId: 512315,
    offence: "Cause Accident",
    status: "Completed",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "BJL_6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    date: "3 days ago4",
    registrarId: 928397,
    offence: "Assulting Officers",
    status: "pending",
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "BJL_5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    date: "5 days ago",
    registrarId: 533215,
    offence: "Over Speeding",
    status: "ongoing",
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "BJL_6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    date: "4 month ago",
    registrarId: 92197,
    offence: "Expired Lice",
    status: "Completed",
  },
  {
    id: 12,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "BJL_6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    date: "4 month ago",
    registrarId: 92197,
    offence: "Expired Lice",
    status: "Completed",
  },
];

const Transaction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();

  // hooks
  const Navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "NO" },

    {
      field: "Officers",
      headerName: "Officers",
      flex: 1,
      cursor: "pointer",

      headerAlign: "left",
      renderCell: ({ row: { name, email } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => Navigate("/userprofile")}
          >
            <Avatar
              title={name}
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
            >
              {name?.charAt(0) + "" + name?.split(" ")[1].charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: colors.grey[300],
                  ml: 1,
                }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "phone",
      headerName: "Vechicle",
      flex: 1,
    },

    {
      field: "name",
      headerName: "Driver Licen No",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: {} }) => {
        return <Typography>KD0399384847736463</Typography>;
      },
    },
    {
      field: "offence", // this field is talking about the data
      headerName: "Offence Commited",
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderCell: ({ row: { offence } }) => {
        return <Typography>{offence}</Typography>;
      },
    },

    {
      field: "status",
      headerName: "Payment Status",
      flex: 1,
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              color:
                status === "pending"
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
    { field: "date", headerName: "Date" },
    {
      field: "",
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
  ];

  return (
    <React.Fragment>
      <Box className="Header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Transaction"
            subtitle={
              user.Officers?.role === "Administrator"
                ? "This page contain the List of all the transaction done by all the participants. "
                : "This page contains the list of all the transaction you made. Here you will see all your previous transactions including those that are pending or completed"
            }
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
            <DataGrid pagination rows={mockDataContacts} columns={columns} />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Transaction;
