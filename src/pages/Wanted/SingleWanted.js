import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Header, WantedAdd } from "../../components";
import { tokens } from "../../theme";
import { useStateContext } from "../../context/Contex";
import { useAuthContext } from "../../context/AuthContex";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleWanted = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [preview, setPreview] = useState();
  const [showPreviewImage, setShowPreviewImage] = useState(null);
  const [addWanted, setAddWanted] = useState(null);

  // hooks
  const { id } = useParams();
  const queryclient = useQueryClient();
  const Navigate = useNavigate();
  const AxiousPrivate = useAxiousPrivate();
  const { user } = useAuthContext();
  const { setDialogMessage, setOPenDialog, sidebarWidth } = useStateContext();

  const [isLoadingData, setIsLoadingData] = useState(true); // Set initial loading state to true

  // function to featch data:
  const { data, error, isFetching, isLoading, isError, refetch } = useQuery(
    "singl wanted",
    async () => {
      try {
        const response = await AxiousPrivate.get(`/wanted/wanted/${id}`);

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
  const HandleImageChange = (element) => {
    setShowPreviewImage(element);
  };

  return (
    <Box
      sx={{
        marginLeft: sidebarWidth === "180px" ? "210px" : "20px",
        transition: " all 1s",
        marginRight: "20px;",
      }}
    >
      <Box display="flex" alignItems="center">
        <Header title="SINGLE WANTED PWESON" subtitle="" />
      </Box>
      <IconButton
        sx={{
          p: 2,
          background: colors.primary[400],
          borderRadius: 2,
        }}
        onClick={() => Navigate(-1)}
      >
        Back
      </IconButton>
      {/* <WantedAdd/> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: 400,
            height: 400,
            background: colors.grey[900],
            borderRadius: 2,
          }}
        >
          <img
            src={
              showPreviewImage === null ? data?.imageURi[0] : showPreviewImage
            }
            alt={`Image`}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "auto",
            gap: 3,
          }}
        >
          {isLoading === true || isFetching === true || data.length < 0 ? (
            <Typography>Loading image ..</Typography>
          ) : (
            data?.imageURi.map((element, index) => (
              <Box
                sx={{
                  mt: 3,
                  width: 100,
                  height: 100,
                  background: colors.grey[900],
                  borderRadius: 2,
                  overflow: "hidden",
                  objectFit: "fill",
                }}
              >
                <img
                  onClick={() => HandleImageChange(element)}
                  src={element}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            ))
          )}
        </Box>
      </Box>
      <Box sx={{ background: colors.primary[400], mt: 3, p: 1 }}>
        <Typography variant="h3">Details</Typography>

        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Person Age:
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.name}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Person Age:
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.age}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Person Height:
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.height}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Person Gender:
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.gender}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Person Loaction:
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.location}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Location of the crime:
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.location_commited}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ px: 2, py: 1, gap: 4, textAlign: "left" }}
        >
          <Typography variant="h3" sx={{ color: colors.grey[600] }}>
            Crime Commited by Person
          </Typography>
          <Typography variant="h3" sx={{ color: colors.grey[400] }}>
            {data?.crime}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default SingleWanted;
