import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import BackupIcon from "@mui/icons-material/Backup";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useStateContext } from "../../context/Contex";
import { useAuthContext } from "../../context/AuthContex";
import { useEffect } from "react";

const Bonus = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  //   state
  const [bonusShore, setBonusShore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bonus, setBonus] = useState();
  const { setDialogMessage, setOPenDialog, setErrorIcon } = useStateContext();
  const [updateElementId, SetUpdateElementId] = useState();

  // hook
  const { user } = useAuthContext();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  // fetch bonus data

  const { data, error, isLoading, isFetching, isError, refetch } = useQuery(
    "bonus",
    async () => {
      try {
        const response = await AxiousPrivate.get("/bank/bonus");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch data.");
      }
    },
    {
      // refetchOnWindowFocus: true, // This will refetch data when the component comes into focus
      enabled: true, // We don't want to fetch data immediately when the component mounts
      refetchOnMount: true,
    }
  );
  // useEffect(() => {
  //   // Function to fetch data
  //   const fetchData = async () => {
  //     try {
  //       await refetch(); // Fetch data using useQuery's refetch function
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   // Fetch data when the component is mounted or when the dependencies (month, year, etc.) change
  //   fetchData();
  // }, [AxiousPrivate, user?.Officers?.role, refetch]);

  //   function
  const HandleBonushShow = async (element) => {
    SetUpdateElementId(element?.id);
    setBonus(element?.Bonus);
    setBonusShore((prev) => !prev);
  };

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.put(`/fine/bonus/${updateElementId}`, newPost);
    },
    {
      onSuccess: (response) => {
        // Invalidate and refetch
        setLoading(false);
        setOPenDialog(true);
        setBonusShore(false);
        setDialogMessage(response?.data?.message);
        queryclient.invalidateQueries("bonus");
      },

      onError: (error) => {
        setOPenDialog(true);
        setErrorIcon(true);
        setDialogMessage(error?.response?.data?.message);
        setLoading(false);
      },
    }
  );

  if (isLoading === true) {
    return <Typography>Loading......</Typography>;
  }
  //   const handle bonus update
  const HandleBonusUpdate = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await mutation.mutate({
        Bonus: bonus,
        officerId: user?.Officers?.id,
      });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{ color: color.blueAccent[200], fontSize: 20, fontWeight: 700 }}
      >
        Configure Bunus
      </Typography>
      <Box sx={{ mt: 5 }}>
        <Typography sx={{ fontSize: 25, fontWeight: 400 }}>
          Bonus Amount per fine
        </Typography>
        {isLoading === true || isFetching === true ? (
          <Typography>Loading</Typography>
        ) : data.lenght < 0 || data === undefined ? (
          []
        ) : (
          data.map((element, index) => (
            <Box key={index}>
              <Typography sx={{ color: color.redAccent[400] }} variant="h4">
                {element.Bonus}%
              </Typography>
              <Button
                sx={{
                  mt: 1,
                  color: color.greenAccent[400],
                  border: `1px solid ${color.grey[500]}`,
                }}
                variant="outlined"
                startIcon={<BackupIcon />}
                onClick={() => HandleBonushShow(element)}
              >
                update
              </Button>
            </Box>
          ))
        )}
      </Box>
      {bonusShore && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: ".7rem",
                height: "auto",
                background:
                  theme.palette.mode === "dark" ? color.primary[400] : "white",
                padding: 3,
                margin: "auto",

                boxShadow:
                  theme.palette.mode === "dark"
                    ? color.primary[400]
                    : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                border: `1px solid 
                ${
                  theme.palette.mode === "dark" ? color.greenAccent[400] : null
                }`,
              }}
            >
              <Typography variant="h3" sx={{ mb: 2 }}>
                Update Bunus
              </Typography>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Update Bonus"
                  variant="outlined"
                  size="full"
                  type="number"
                  required="true"
                  onChange={(event) => setBonus(event.target.value)}
                  value={bonus}
                />
              </FormControl>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleBonusUpdate}
                loading={loading}
                //   loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: color.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>Update bunus</span>
              </LoadingButton>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={() => setBonusShore(false)}
                loading={false}
                //   loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: color.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>Cancel</span>
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Bonus;
