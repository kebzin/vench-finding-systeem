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
import { useMutation, useQueryClient } from "react-query";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useStateContext } from "../../context/Contex";

const Bonus = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  //   state
  const [bonusShore, setBonusShore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bonus, setBonus] = useState();
  const { setDialogMessage, setOPenDialog } = useStateContext();

  // hook

  //   function
  const HandleBonushShow = () => {
    setBonusShore((prev) => !prev);
  };
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      //   return AxiousPrivate.patch(`/price/prices/${updateitem.id}`, newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        setLoading(false);
        setOPenDialog(true);
        setBonusShore(false);
        setDialogMessage("Bonus successfully Updated");
        queryclient.invalidateQueries("fine");
      },

      onError: () => {
        setLoading(false);
      },
    }
  );

  //   const handle bonus update
  const HandleBonusUpdate = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await mutation.mutate({
        bonus: bonus,
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
        <Typography sx={{ color: color.redAccent[400] }} variant="h4">
          GMD{"20"}
        </Typography>
        <Button
          sx={{
            mt: 1,
            color: color.greenAccent[400],
            border: `1px solid ${color.grey[500]}`,
          }}
          variant="outlined"
          startIcon={<BackupIcon />}
          onClick={HandleBonushShow}
        >
          update
        </Button>
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
                  type="text"
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
