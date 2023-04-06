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

const WantedAdd = ({ setAddWanted }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  // hooks
  const { user } = useAuthContext();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  return (
    <Box
      position="fixed"
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
        <Box sx={{ position: "relative" }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            title="Add picture"
          >
            <input hidden accept="image/*" type="file" />
            <AddAPhotoIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? color.redAccent[400]
                    : color.redAccent[400],
                fontSize: 50,
              }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl
            sx={{ mt: 1, width: "100%" }}
            variant="outlined"
            //   onChange={HandleFilter}
            //   value={LicenNumber}
          >
            <TextField
              id="outlined-basic"
              placeholder=" Enter Full Name"
              variant="outlined"
              size="full"
            />
          </FormControl>
          <FormControl
            sx={{ mt: 1, width: "100%" }}
            variant="outlined"
            //   onChange={HandleFilter}
            //   value={LicenNumber}
          >
            <TextField
              id="outlined-basic"
              placeholder=" Enter Locatiion of wanted individual"
              variant="outlined"
              size="full"
            />
          </FormControl>
          <FormControl
            sx={{ mt: 1, width: "100%" }}
            variant="outlined"
            //   onChange={HandleFilter}
            //   value={LicenNumber}
          >
            <TextField
              id="outlined-basic"
              placeholder="offence Accused"
              variant="outlined"
              size="full"
            />
          </FormControl>
          <FormControl
            sx={{ mt: 1, width: "100%" }}
            variant="outlined"
            //   onChange={HandleFilter}
            //   value={LicenNumber}
          >
            <TextField
              id="outlined-basic"
              placeholder="Body color"
              variant="outlined"
              size="full"
            />
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormControl
              sx={{ mt: 1, width: "100%" }}
              variant="outlined"
              //   onChange={HandleFilter}
              //   value={LicenNumber}
            >
              <TextField
                id="outlined-basic"
                placeholder="Height of individual"
                variant="outlined"
                size="full"
              />
            </FormControl>

            <FormControl
              sx={{ mt: 1, width: "100%" }}
              variant="outlined"
              //   onChange={HandleFilter}
              //   value={LicenNumber}
            >
              <TextField
                id="outlined-basic"
                placeholder="Age predict or expect "
                variant="outlined"
                size="full"
              />
            </FormControl>
          </Box>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ mt: 1, width: "100%" }}
            variant="outlined"
            //   onChange={HandleFilter}
            //   value={LicenNumber}
          >
            <textarea
              placeholder="Type here some description here ...."
              //   autoFocus={true}
              style={{
                minHeight: "100px",
                backgroundColor: "inherit",
                padding: "10px",
                color: "inherit",
                borderRadius: "5px",
                borderColor: "inherit",
                border: "0.6px solid",
                outlineStyle: "none",
              }}
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              // flexWrap: "wrap",
            }}
          >
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
              // onClick={HandleFineSubmit}
              // loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span style={{ padding: "10px" }}>Post</span>
            </LoadingButton>
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
              onClick={() => setAddWanted(false)}
              // loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span style={{ padding: "10px" }}>Cancel</span>
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WantedAdd;
