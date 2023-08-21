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
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../context/AuthContex";
import useAxiousPrivate from "../hooks/useAxiousPrivate";
import { tokens } from "../theme";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { LoadingButton } from "@mui/lab";
import { useStateContext } from "../context/Contex";
import DeleteIcon from "@mui/icons-material/Delete";
const WantedAdd = ({ setAddWanted }) => {
  const theme = useTheme();
  const Color = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [crime, setcrime] = useState();
  const [height, setHeight] = useState();
  const [location, setLocation] = useState();
  const [age, setAge] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState([]);
  // const [location_commited, setLocation_commited] = useState();
  const [colorr, setColor] = useState();

  // hooks
  const { user } = useAuthContext();
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  const { setDialogMessage, setErrorIcon, setOPenDialog } = useStateContext();

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    for (const image of file) {
      formData.append("images", image);
    }

    try {
      const response = await AxiousPrivate.post("/wanted/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Add this line
        },
      });

      return response?.data?.uploadedImages;
      // Continue with other form data and mutation logic
    } catch (error) {
      console.error("Error uploading image", error.message);
    } finally {
      setLoading(false);
    }
  };

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.post(
        `/officers/wanted/${user?.Officers?.id}`,
        newPost
      );
    },

    {
      onSuccess: (response) => {
        setOPenDialog(true);
        setDialogMessage("Sussefully Added");
        setLoading(false);
        queryclient.invalidateQueries("wanted");
      },
      onError: (error) => {
        setLoading(false);
        setOPenDialog(true);
        setErrorIcon(true);
        setDialogMessage(error.response.data);
      },
    }
  );

  // handle submit function
  const HandleAdd = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let imageURLL = [];
      imageURLL = await handleUpload();

      if (imageURLL) {
        await mutation.mutate({
          name: name,
          gender: gender,
          crime: crime,
          height: height,
          location: location,
          description: description,
          age: age,
          color: colorr,
          imageURi: imageURLL,
          officersid: user?.Officers?.id,
        });
      } else {
        setLoading(false);
        setOPenDialog(true);
        setErrorIcon(true);
        setDialogMessage("An Error occure while uploading and image");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      // setError(error.message);
    }
  };

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    setFile((prevImages) => [...prevImages, ...newImages]);
  };
  const handleDeleteImage = (image) => {
    setFile((prevImages) => prevImages.filter((_, index) => index !== image));
  };
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
          theme.palette.mode === "dark" ? Color.primary[400] : "white"
        }
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        border={`1px solid ${
          theme.palette.mode === "dark" ? Color.greenAccent[400] : null
        }`}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            title="Add picture"
          >
            <form enctype="multipart/form-data">
              <input
                hidden
                accept="image/*"
                type="file"
                multiple
                name="image"
                onChange={handleImageChange}
              />
            </form>
            <AddAPhotoIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? Color.redAccent[400]
                    : Color.redAccent[400],
                fontSize: 50,
              }}
            />
          </IconButton>
        </Box>
        {/* displayong the image */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {file &&
            file?.map((image, index) => (
              <Box key={index + 1} sx={{ position: "relative" }}>
                <IconButton
                  onClick={(event) => handleDeleteImage(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: Color.grey[900],
                  }}
                >
                  <DeleteIcon
                    sx={{ color: Color.redAccent[500], width: 30, height: 30 }}
                  />
                </IconButton>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                  }}
                />
              </Box>
            ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl
            sx={{ mt: 1, width: "100%" }}
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
            value={name}
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
            onChange={(event) => setLocation(event.target.value)}
            value={location}
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
            onChange={(event) => setcrime(event.target.value)}
            value={crime}
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
            onChange={(event) => setColor(event.target.value)}
            value={colorr}
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
              onChange={(event) => setHeight(event.target.value)}
              value={height}
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
              onChange={(event) => setAge(event.target.value)}
              value={age}
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
              onChange={(event) => setGender(event.target.value)}
              value={gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
            <textarea
              placeholder="Type here some description here ...."
              //   autoFocus={true}
              onChange={(event) => setDescription(event.target.value)}
              value={description}
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
                    ? Color.greenAccent[700]
                    : Color.greenAccent[500],
                "&:hover": { background: Color.greenAccent[500] },
              }}
              onClick={HandleAdd}
              loading={loading}
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
                    ? Color.greenAccent[700]
                    : Color.greenAccent[500],
                "&:hover": { background: Color.greenAccent[500] },
              }}
              onClick={() => setAddWanted(false)}
              // loading={loading}
              loadingPosition="end"
              variant="contained"
              // loading={loading}
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
