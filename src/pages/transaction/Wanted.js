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
const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
    status: "Wanted",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    status: "Wanted",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "Resolved",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
    status: "Wanted",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    status: "Wanted",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "Wanted",
    status: "Resolved",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    status: "Wanted",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    status: "Resolved",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
    status: "Wanted",
  },
];
const Wanted = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [preview, setPreview] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const { sidebarWidth } = useStateContext();
  const columns = [
    { field: "id", headerName: "NO" },

    {
      field: "name",
      headerName: "Name",
      flex: 1,

      cursor: "pointer",
      headerAlign: "left",
      align: "left",
      renderCell: ({ row: { name } }) => {
        return (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              p: 2,
            }}
          >
            <Avatar
              sx={{
                borderRadius: 1,
                width: 55,
                height: 55,
                background: colors.greenAccent[100],
              }}
            />
            <Typography variant="h6">{name}</Typography>
          </Box>
        ); // payment status
      },
    },

    {
      field: "age",
      headerName: "age",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "height ",
      headerName: "Height of Individual",

      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
            }}
          >
            5 feet
          </Typography>
        ); // payment status
      },
    },
    {
      field: "bodycolor ",
      headerName: "Body color",

      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
            }}
          >
            brown
          </Typography>
        ); // payment status
      },
    },
    {
      field: "Gender ",
      headerName: "Gender",

      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
            }}
          >
            Male
          </Typography>
        ); // payment status
      },
    },

    // {
    //   field: "name",
    //   headerName: "Driver Licen No",
    //   flex: 1,
    // },
    // {
    //   field: "name", // this field is talking about the data
    //   headerName: "Offence Commited",
    //   headerAlign: "left",
    //   flex: 1,
    // },

    {
      field: "location from ",
      headerName: "Location of Individual",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              color: colors.blueAccent[400],
            }}
          >
            Sukuta Trafic Light
          </Typography>
        ); // payment status
      },
    },
    {
      field: "commited",
      headerName: "Location Crime  Comitted",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              color: colors.blueAccent[400],
            }}
          >
            Sukuta Trafic Light
          </Typography>
        ); // payment status
      },
    },
    {
      field: "status",
      headerName: "Problem Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              color:
                status === "Resolved"
                  ? colors.greenAccent[400]
                  : colors.redAccent[400],
            }}
          >
            {status}
          </Typography>
        ); // payment status
      },
    },

    {
      field: "preview",
      headerName: "Preview",
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box
            onClick={() => {
              setPreview(row);
              setShowDetails(true);
            }}
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

  const [addWanted, setAddWanted] = useState(false);

  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "15px;",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Wanted" subtitle="" />
      </Box>
      <Box>
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
          {" "}
          {
            <DataGrid
              pagination
              rows={mockDataTeam}
              columns={columns}
              rowHeight={64}
            />
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Wanted;
