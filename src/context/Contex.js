import { CreateNewFolder } from "@mui/icons-material";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const StateContex = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    notification: false,
    profile: false,
    setting: false,
  };
  const [currentUser, setCurrentUser] = useState();
  const [isClicked, setIsClicked] = useState(initialState);
  const [isSidebar, setIsSidebar] = useState(true);
  const [istopbar, setTopbar] = useState(true);
  const [OpenDialog, setOPenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleDeleteMessage, setToggleDeleteMessage] = useState("");
  const [callfunctions, setCallFunctions] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState();
  const [sidebarWidth, setSidebarWidth] = useState();
  const [contentWidth, setContentWidth] = useState();

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
        sidebarWidth,
        setSidebarWidth,
        contentWidth,
        setContentWidth,
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
        toggleDelete,
        setToggleDelete,
        toggleDeleteMessage,
        setToggleDeleteMessage,
        callfunctions,
        setCallFunctions,
        errorIcon,
        setErrorIcon,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContex.Provider>
  );
};

export const useStateContext = () => useContext(StateContex);

export default ContextProvider;
