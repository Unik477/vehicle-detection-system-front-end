import { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalProvider = ({ children }) => {
  // Initialize state with values from localStorage or defaults
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });
  const [gateNumber, setGateNumber] = useState(() => {
    return localStorage.getItem("gateNumber") || null;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("gateNumber", gateNumber);
  }, [isLoggedIn, gateNumber]);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, gateNumber, setGateNumber }}
    >
      {children}
    </GlobalContext.Provider>
  );
};