import { LoadingButton } from "@mui/lab";
import {
  Box,
  colors,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { color } from "@mui/system";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContex";
import { useStateContext } from "../context/Contex";
import { makeRequest } from "../hooks/axious";
import useAxiousPrivate from "../hooks/useAxiousPrivate";
import { tokens } from "../theme";
import PopUpMessage from "./PopUpMessage";

const CrimePrcing = () => {
  const { setUser, user } = useAuthContext();
  const Navigate = useNavigate();

  const theme = useTheme();
  const COLORS = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);

  const [OffenceName, setOffenceName] = useState("");
  const [OffenceCategory, setOffenceCategory] = useState("");
  const [OffencePrice, setOffencePrice] = useState("");
  const [error, setError] = useState("");
  const { setDialogMessage, setToggleAdd, setOPenDialog } = useStateContext();

  const AxiousPrivate = useAxiousPrivate();

  const queryclient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery(
    "category",
    async () => {
      try {
        const response = await AxiousPrivate.get("/category/category");

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

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.post("/price/prices/", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        setLoading(false);
        setOPenDialog(true);
        setToggleAdd(false);
        setDialogMessage("New Price have been successfully created");
        queryclient.invalidateQueries("Price");
      },
    }
  );
  // handle submit function
  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await mutation.mutate({
        OffenceName: OffenceName,
        OffencePrice: OffencePrice,
        officerId: user.Officers.id,
        OffenceCategory: OffenceCategory,
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setError(error.message);
    }
  };

  //   handle cancel
  const HandleCancel = async (event) => {
    event.preventDefault();
    // a function will be inplemented late to stop the post from happen when the user click the button

    setToggleAdd(false);
  };
  return (
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
              theme.palette.mode === "dark" ? COLORS.primary[400] : "white",
            padding: 3,
            margin: "auto",

            boxShadow:
              theme.palette.mode === "dark"
                ? COLORS.primary[400]
                : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            border: `1px solid 
                ${
                  theme.palette.mode === "dark" ? COLORS.greenAccent[400] : null
                }`,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" sx={{ mb: 2 }}>
              Add Fine Prices
            </Typography>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Offence Name"
                variant="outlined"
                size="full"
                type="email"
                required="true"
                onChange={(event) => setOffenceName(event.target.value)}
                value={OffenceName}
              />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={OffenceCategory}
                onChange={(event) => setOffenceCategory(event.target.value)}
                autoWidth
                label="Category"
              >
                {isLoading === true || isFetching === true ? (
                  <Typography>Loading....</Typography>
                ) : (
                  data?.map((value, index) => (
                    <MenuItem key={index} value={value?.category}>
                      {value?.category}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label=" Enter Offence Amount "
                variant="outlined"
                size="full"
                type="number"
                required="true"
                onChange={(event) => setOffencePrice(event.target.value)}
                value={OffencePrice}
              />
            </FormControl>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleCancel}
                loading={false}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: COLORS.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>Cancel</span>
              </LoadingButton>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: COLORS.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>add pricing</span>
              </LoadingButton>
            </Box>
          </Box>

          <Typography
            sx={{
              mt: 2,
              color: COLORS.redAccent[300],
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CrimePrcing;
