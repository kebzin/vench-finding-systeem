import { CreateNewFolder } from "@mui/icons-material";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const StateContex = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    notification: false,
    profile: false,
  };
  const [currentUser, setCurrentUser] = useState();
  const [isClicked, setIsClicked] = useState(initialState);
  const [isSidebar, setIsSidebar] = useState(true);
  const [istopbar, setTopbar] = useState(true);
  const [OpenDialog, setOPenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [toggleAdd, setToggleAdd] = useState(false);

  // click function
  const HandleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true }); // live everything as it is and only updates the value that was clicked
  };
  const HandleClickClose = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: false }); // live everything as it is and only updates the value that was clicked
  };

  // login function

  return (
    <StateContex.Provider
      value={{
        isSidebar,
        setIsSidebar,
        isClicked,
        istopbar,
        setTopbar,
        setIsClicked,
        HandleClick,
        HandleClickClose,
        setOPenDialog,
        OpenDialog,
        dialogMessage,
        setDialogMessage,
        toggleAdd,
        setToggleAdd,
      }}
    >
      {children}
    </StateContex.Provider>
  );
};

export const useStateContext = () => useContext(StateContex);

export default ContextProvider;
