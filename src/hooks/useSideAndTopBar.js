import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/Contex";

const useSideAndTopBar = () => {
  const { setIsSidebar, setTopbar } = useStateContext();
  useEffect(() => {
    setIsSidebar(false);
    setTopbar(false);
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default useSideAndTopBar;
