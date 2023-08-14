import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { useAuthContext } from "../context/AuthContex";
import { Header } from "../components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../hooks/useAxiousPrivate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateContext } from "../context/Contex";
import undraw_exams_re_4ios from "../assets/illustration/undraw_exams_re_4ios (copy).svg";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
// import ru from "javascript-time-ago/locale/ru.json";
import { useEffect } from "react";
import { useState } from "react";

TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(ru);

//
const TopOfficers = ({ data, month, year }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const { setDialogMessage, setOPenDialog, sidebarWidth } = useStateContext();

  // hooks
  const queryclient = useQueryClient();
  const Navigate = useNavigate();

  function filterDataForYearAndMonth(data, year, month) {
    // Check if data is not available or is null
    if (!data) {
      return []; // Return an empty array if data is not available yet or is null.
    }
    // Convert data to an array if it's not already
    // console.log("dddd", data);

    const dataArray = Array.isArray(data) ? data : [data];
    // Check if dataArray contains valid objects with the 'createdAt' property
    const filteredData = dataArray.filter((entry) => {
      if (!entry || typeof entry !== "object" || !entry.createdAt) {
        return false; // Skip invalid entries without the 'createdAt' property
      }

      const createdAtDate = new Date(entry.createdAt);

      // Check if the createdAtDate matches the provided year and month
      return (
        createdAtDate.getFullYear() === parseInt(year) &&
        createdAtDate.getMonth() === parseInt(month)
      );
    });

    return filteredData;
  }

  const filteredData = filterDataForYearAndMonth(data, year, month);

  /**
   * Retrieves the top 5 officers based on the total number of fines they have.
   *
   * @param {Array} data - An array of data containing officer details and fine information.
   * @returns {Array} - An array of officer objects, sorted by the total number of fines in descending order.
   */
  const getTop5OfficersByFines = (data) => {
    // Create a map to track officers and their total fines
    const officerFinesMap = new Map();

    // Calculate total fines for each officer
    data.forEach((row) => {
      const { officerId } = row;
      if (officerId) {
        const officerIdValue = officerId.id; // Assuming 'id' is the officer's unique identifier
        const currentTotalFines =
          officerFinesMap.get(officerIdValue)?.totalFines || 0;
        const officerClone = {
          ...officerId,
          totalFines: currentTotalFines + 1,
        }; // Clone the officer object
        officerFinesMap.set(officerIdValue, officerClone);
      }
    });

    // Convert the map values to an array of officer objects
    const officersWithFines = Array.from(officerFinesMap.values());

    // Sort the officers array in descending order based on total fines
    officersWithFines.sort((a, b) => b.totalFines - a.totalFines);

    // Take the top 5 officers with the highest total fines
    const top5Officers = officersWithFines.slice(0, 5);

    return top5Officers;
  };
  const top5Officers = getTop5OfficersByFines(data);

  const columns = [
    {
      field: "firstName",
      headerName: "Profile",
      flex: 2,
      cursor: "pointer",
      headerAlign: "left",
      renderCell: ({ row: { firstName, id, lastName, email } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() =>
              Navigate(`/userprofile/${id}`, { data: top5Officers })
            }
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
      field: "BatchNumber",
      headerName: " Officer Batch Number",
      flex: 1,
      renderCell: ({ row: { BatchNumber } }) => {
        return <Typography>{BatchNumber}</Typography>;
      },
    },

    {
      field: "rank",
      headerName: "Officer Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { firstName, lastName } }) => {
        return <Typography>{firstName + " " + lastName}</Typography>;
      },
    },
    {
      field: "lastName", // this field is talking about the data
      headerName: "Number Of Fine",
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderCell: ({ row: { totalFines } }) => {
        return <Typography>{totalFines}</Typography>;
      },
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ height: "45vh" }}>
        <Box>
          <Box>
            <Box
              m="40px 0 0 0"
              height="40vh"
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

              <DataGrid
                pagination
                rows={top5Officers
                  ?.slice()
                  ?.sort(
                    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                  )}
                columns={columns}
                editMode={"row"}
              />

              {/* )} */}
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TopOfficers;
