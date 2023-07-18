import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { tokens } from "../../theme";
import { useAuthContext } from "../../context/AuthContex";
import { Header } from "../../components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateContext } from "../../context/Contex";
import undraw_exams_re_4ios from "../../assets/illustration/undraw_exams_re_4ios (copy).svg";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

//
const Transaction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const { setDialogMessage, setOPenDialog, sidebarWidth } = useStateContext();

  // hooks
  const queryclient = useQueryClient();
  const Navigate = useNavigate();
  const AxiousPrivate = useAxiousPrivate();
  const { user } = useAuthContext();

  const { isLoading, error, data, refetch } = useQuery("transaction", () =>
    AxiousPrivate.get(
      user?.Officers?.role === "Employee"
        ? `/fine/fine/${user?.Officers?.id}`
        : `/fine/fine/`
    )
      .then((result) => result.data)
      .catch((err) => console.log(err))
  );

  const mutation = useMutation(
    ({ id, fineAmount, officerId }) => {
      return AxiousPrivate.delete(`/fine/fine/${id}`, {
        data: { fineAmount, officerId },
      });
    },
    {
      onSuccess: (res) => {
        setOPenDialog(true);
        setDialogMessage(res.data.message);
        queryclient.invalidateQueries("transaction");
      },

      onError: (error) => {
        setOPenDialog(true);
        setDialogMessage(error.message);
      },
    }
  );
  const HandleDelete = (id, event) => {
    event.preventDefault();
    try {
      mutation.mutate({
        id: id,
        officerId: user?.Officers?.id,
        fineAmount: "string",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "NO" },

    {
      field: "officerId",
      headerName: "Officers",
      flex: 1,
      cursor: "pointer",

      headerAlign: "left",
      renderCell: ({ row: { officerId, email } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => Navigate(`/userprofile/${officerId.id}`)}
          >
            <Avatar
              title={officerId.firstName}
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
              {officerId?.firstName?.charAt(0) +
                "" +
                officerId?.lastName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: colors.grey[300],
                  ml: 1,
                }}
              >
                {officerId?.firstName + " " + officerId?.lastName}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "NumberPlat",
      headerName: "Vechicle",
      flex: 1,
    },

    {
      field: "name",
      headerName: "Driver Licen No",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { LicenNumber } }) => {
        return <Typography>{LicenNumber}</Typography>;
      },
    },
    {
      field: "OffenceCommited", // this field is talking about the data
      headerName: "Offence Commited",
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderCell: ({ row: { OffenceCommited } }) => {
        return <Typography>{OffenceCommited}</Typography>;
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
            <ReactTimeAgo date={createdAt} />
            {/* {createdAt} */}
          </Typography>
        ); // number of fine mad by the user
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
    {
      field: "",
      headerName: "Delete",
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            // onClick={() => Navigate(`${id}`)}
            sx={{
              // background:
              //   theme.palette.mode === "light"
              //     ? colors.redAccent[700]
              //     : colors.redAccent[400],
              p: 1,
              cursor: "pointer",
              // color: colors.primary[700],
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
              onClick={(event) => HandleDelete(id, event)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Box
        sx={{
          marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
          transition: " all 1s",
          marginRight: "15p;",
        }}
      >
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
            {" "}
            {isLoading ? (
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
            ) : error ? (
              "error"
            ) : (
              <DataGrid
                pagination
                rows={data}
                columns={columns}
                editMode={"row"}
              />
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Transaction;
