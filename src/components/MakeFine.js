import { useTheme } from "@emotion/react";
import {} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "../context/AuthContex";
import { useStateContext } from "../context/Contex";
import useAxiousPrivate from "../hooks/useAxiousPrivate";
import { tokens } from "../theme";

const addButtonContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  height: "100%",
  // miniWidth: "50%",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MakeFine = ({ setToggleAdd }) => {
  // states
  const [loading, setLoading] = useState(false);
  const [NumberPlat, setNumberPlat] = useState("");
  const [LicenNumber, setLicenNumber] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [OffenceCommited, setOffenceCommited] = useState();
  const [fineAmount, setfineAmount] = useState("");
  const [fineDescription, setfineDescription] = useState("");
  const [DriverAddress, setDriverAddress] = useState(null);
  const [wanted, setwanted] = useState(false);
  const [category, setcategory] = useState();
  const [fineCategory, setFineCategory] = useState("");

  const { setDialogMessage, setOPenDialog, setErrorIcon } = useStateContext();

  const [latituid, setLatituid] = useState(null);
  const [longitituid, setLongitituid] = useState(null);
  // useEffect(() => {
  //   const getLocation = () => {
  //     if (!navigator.geolocation) {
  //       window.alert("Geolocation is not supported by this browser");
  //     }
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLatituid(position.coords.latitude);
  //       setLongitituid(position.coords.longitude);
  //       console.log(latituid, " ", longitituid);
  //     });
  //   };
  // });

  // hooks
  const { user } = useAuthContext();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  // fetch officers
  const { data, error } = useQuery("driver", async () => {
    return await AxiousPrivate.get("/driver/driver")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  });

  const result = useQuery(
    "Price",
    async () =>
      await AxiousPrivate.get("/price/prices")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        })
  );

  const mutation = useMutation(
    (newPost) => {
      console.log("new posy", newPost);
      console.log(newPost);
      return AxiousPrivate.post(`/fine/fine/${user?.Officers?.id}`, newPost);
    },
    {
      onSuccess: (response) => {
        setOPenDialog(true);
        setfineAmount("");
        setfineDescription("");
        setFineCategory("");
        setDriverAddress("");
        setNumberPlat("");
        setcategory("");
        setLicenNumber("");
        setDialogMessage(" successfully Fined ");
        setLoading(false);

        console.log(response);
      },
      onError: (error) => {
        setOPenDialog(true);
        setErrorIcon(true);
        console.log(error);
        setDialogMessage(error.message);

        setLoading(false);
      },
    }
  );

  const HandleFineSubmit = async (event) => {
    event.preventDefault();
    if (
      (Boolean(NumberPlat),
      Boolean(LicenNumber),
      Boolean(OffenceCommited),
      Boolean(DriverName),
      Boolean(category),
      Boolean(fineCategory),
      Boolean(fineAmount),
      Boolean(fineDescription))
    ) {
      return (
        setOPenDialog(true),
        setErrorIcon(true),
        setDialogMessage("All file are Required"),
        setLoading(false)
      );
    }

    try {
      setLoading(true);
      mutation.mutate({
        OffenceCommited: OffenceCommited?.OffenceName,
        fineAmount: fineAmount,
        fineDescription: fineDescription,
        DriverAddress: DriverAddress,
        DriverName: DriverName,
        NumberPlat: NumberPlat,
        LicenNumber: LicenNumber,
        wanted: wanted,
        category: category,
        fineCategory: fineCategory,
      });
      console.log(fineDescription);
    } catch (error) {
      setLoading(false);
    }
  };

  //  function ::::::::::::::::::
  // making fine function

  // handle filter
  // Filter array items based on search criteria (query)

  function filterItems(arr, query) {
    return arr.find((el) => el.driversLicensNumber === query);
  }

  const HandleFilter = (event) => {
    const licenseNumber = event.target.value;
    setLicenNumber(licenseNumber);

    const driver = filterItems(data, licenseNumber);

    if (driver) {
      setDriverName(
        `${driver.driversFirstName || ""} ${driver.driversLastName || ""}`
      );
      setDriverAddress(driver.driversAddress || "");
    }
    if (licenseNumber.length >= 5) {
      return (
        setOPenDialog(true),
        setErrorIcon(true),
        setDialogMessage(
          "The driver licen number you enter is incorrect pleas retry again "
        ),
        // Handle the case when no driver is found with the given license number
        setDriverName(""),
        setDriverAddress("")
      );

      // You could show an error message or take other actions as needed.
    }
  };

  const HandleOffenceCommited = (event) => {
    // setOffenceCommited(result?.data?.OffencePrice)
    setOffenceCommited(event.target.value);
    setfineAmount("GMD" + " " + OffenceCommited?.OffencePrice);
    setcategory(OffenceCommited?.OffenceCategory);
  };

  const HandleWanted = (event) => {
    setwanted((previouseState) => !previouseState);
  };
  const theme = useTheme();
  const COLORS = tokens(theme.palette.mode);
  const AddButtonContainerContent = {
    borderRadius: ".7rem",
    background: theme.palette.mode === "dark" ? COLORS.primary[400] : "white",
    padding: 5,
    boxShadow:
      theme.palette.mode === "dark"
        ? COLORS.primary[400]
        : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    border: `1px solid 
        ${COLORS.greenAccent[400]}`,
  };

  return (
    <Box sx={addButtonContainer} className="Transition">
      <Box sx={AddButtonContainerContent}>
        <form>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography sx={{ pb: 1, fontSize: 20, fontWeight: 600 }}>
              Make a Fine
            </Typography>
            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              onChange={(event) => setNumberPlat(event.target.value)}
              value={NumberPlat}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="full"
                type="text"
                label="Enter Number Plate"
              />
            </FormControl>

            <FormControl
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
              onChange={HandleFilter}
              value={LicenNumber}
            >
              <TextField
                id="outlined-basic"
                placeholder=" Enter Dreiver Licen Number"
                variant="outlined"
                size="full"
                type="text"
                label=" Enter Dreiver Licen Number"
              />
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="full"
                type="text"
                placeholder="Drivers Full Name"
                value={
                  DriverName === undefined ||
                  DriverName === "" ||
                  DriverName === undefined + " " + undefined
                    ? "Drivers Name"
                    : DriverName
                }
                disabled
              />
            </FormControl>

            <FormControl
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
              placeholder="Driver Address"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="full"
                type="text"
                value={
                  DriverAddress == undefined ||
                  DriverAddress == null ||
                  DriverAddress === "" ||
                  DriverAddress === undefined + " " + undefined
                    ? "Drivers Address"
                    : DriverAddress
                }
                placeholder="Driver Address"
                disabled
              />
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              {/* <TextField
                id="outlined-basic"
                label="Offence  Commited"
                variant="outlined"
                size="full"
                type="text"
                onChange={() => {}}
              /> */}
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                MenuProps={MenuProps}
                onChange={(event) => HandleOffenceCommited(event)}
                value={
                  OffenceCommited === undefined || OffenceCommited === ""
                    ? "Select Offence Commited"
                    : OffenceCommited
                }
              >
                <MenuItem selected disabled value={"Select Offence Commited"}>
                  Select Offence Commited
                </MenuItem>
                {result?.data?.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{}}>{name?.OffenceName} </Typography>
                      <Typography>{" " + name?.OffenceCategory}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                placeholder="Offence Price"
                variant="outlined"
                size="full"
                type="text"
                value={fineAmount}
                disabled
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={fineCategory}
                onChange={(event) => setFineCategory(event.target.value)}
                autoWidth
                label="Category"
              >
                <MenuItem value={fineCategory} defaultValue={fineCategory}>
                  {fineCategory}
                </MenuItem>
                <MenuItem value={`truck`}>Truck</MenuItem>
                <MenuItem value={`car`}>Car</MenuItem>
                <MenuItem value={`motocar`}>Motocar</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
              // disabled
            >
              <textarea
                style={{
                  background: "inherit",
                  color: "inherit",
                  fontSize: "inherit",
                  padding: "10px",
                  border: `.3px solid ${COLORS.grey[500]}`,
                  outline: "inherit",
                  borderRadius: "5px",
                  placeContent: "center",
                }}
                label="Enter Some Descriptions..."
                minRows={2}
                placeholder={"Enter some Describtion"}
                onChange={(event) => setfineDescription(event.target.value)}
              />
            </FormControl>

            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 2, py: 1, gap: 6 }}
            >
              <Typography>Wanted</Typography>
              <Switch
                color="secondary"
                checked={wanted}
                onClick={(event) => HandleWanted(event)}
                sx={{}}
              />
            </Stack> */}

            <LoadingButton
              sx={{
                width: "100%",
                mt: 2,
                background:
                  theme.palette.mode === "dark"
                    ? COLORS.greenAccent[700]
                    : COLORS.greenAccent[500],
                "&:hover": { background: COLORS.greenAccent[500] },
              }}
              onClick={HandleFineSubmit}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span style={{ padding: "10px" }}>Post</span>
            </LoadingButton>

            {user?.Officers.role === "Sub Admin" ? (
              <LoadingButton
                sx={{
                  width: "100%",
                  mt: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? COLORS.greenAccent[700]
                      : COLORS.greenAccent[500],
                  "&:hover": { background: COLORS.greenAccent[500] },
                }}
                onClick={() => setToggleAdd(false)}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                <span style={{ padding: "10px" }}>Cancel</span>
              </LoadingButton>
            ) : null}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default MakeFine;
