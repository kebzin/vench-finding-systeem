import {
  Avatar,
  Box,
  colors,
  FormControl,
  IconButton,
  TextField,
  useTheme,
  RadioGroup,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useQueryClient } from "react-query";
import { useAuthContext } from "../context/AuthContex";
import useAxiousPrivate from "../hooks/useAxiousPrivate";
import { tokens } from "../theme";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { LoadingButton } from "@mui/lab";

const ViewWanted = ({ preview, setShowDetails }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  // hooks
  const { user } = useAuthContext();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      height="auto"
      zIndex={100}
      minWidth={"25%"}
    >
      <Box
        padding="2rem"
        borderRadius=".7rem "
        backgroundColor={
          theme.palette.mode === "dark" ? color.primary[400] : "white"
        }
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        border={`1px solid ${
          theme.palette.mode === "dark" ? color.greenAccent[400] : null
        }`}
      >
        <Box
          sx={{
            position: "relative",
            height: 100,
            width: 100,
            marginBottom: 2,
          }}
        >
          <Avatar
            sx={{
              borderRadius: 2,
              width: 100,
              height: 100,
              background: color.blueAccent[100],
            }}
          />
        </Box>
        <Box>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Full Name:{" "}
            </Typography>
            <Typography>Fullname of the Person</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              {" "}
              Gender :{" "}
            </Typography>
            <Typography>Gender of the person </Typography>
          </Stack>
          <Stack direction="row" spacing={5}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Crime Commited:{" "}
            </Typography>
            <Typography>What crideme did this person commited</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              height :
            </Typography>
            <Typography>Height of the person</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Location of Individual:
            </Typography>
            <Typography>Location of Indicidual</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              {" "}
              Location crime Commited :{" "}
            </Typography>
            <Typography>Location crime Commited</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Status of the Problem:{" "}
            </Typography>
            <Typography>Status of the Problem</Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ p: 1 }}>
              {" "}
              Description :{" "}
            </Typography>
            <Typography>Description </Typography>
          </Stack>
        </Box>
        <LoadingButton
          sx={{
            width: "100%",
            mt: 2,
            background:
              theme.palette.mode === "dark"
                ? color.greenAccent[700]
                : color.greenAccent[500],
            "&:hover": { background: color.greenAccent[500] },
          }}
          onClick={() => setShowDetails(false)}
          // loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span style={{ padding: "10px" }}>Close</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ViewWanted;
