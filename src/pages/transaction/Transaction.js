import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import { useNavigate } from "react-router-dom";
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
// import ru from "javascript-time-ago/locale/ru.json";
import { useEffect } from "react";
import { useState } from "react";

TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(ru);

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

  const [isLoadingData, setIsLoadingData] = useState(true); // Set initial loading state to true

  // functions

  const { data, error, isFetching, isLoading, isError, refetch } = useQuery(
    "transaction",
    async () => {
      try {
        const response = await AxiousPrivate.get(
          user?.Officers?.role === "Employee"
            ? `/fine/fine/${user?.Officers?.id}`
            : `/fine/fine/`
        );

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    },
    {
      refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: true, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: true,
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

  const mutation = useMutation(
    ({ id, officerId }) => {
      return AxiousPrivate.delete(`/fine/fine/${id}`, {
        data: { officerId },
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
  }
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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

  // const sortedData =
  //   data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];
  const HandleDelete = (id, event, officerId) => {
    try {
      mutation.mutate({
        id: id,
        officerId: officerId?.id,
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
            <ReactTimeAgo date={Date.parse(createdAt)} />
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
                ? "Welcome to the transaction history page, where you can find a comprehensive list of all transactions carried out by our valued participants. "
                : "Welcome to your transaction history page! Here, you'll find a detailed list of all your past transactions, including both pending and completed ones. To explore more details about a specific transaction, simply click on 'Preview' for an in-depth view"
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
                rows={data}
                columns={columns}
                editMode={"row"}
              />
            )}
            {/* )} */}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Transaction;
