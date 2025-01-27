import React from "react";
import { ErrorHandlerContextProvider } from "./ErrorHandlerContext";

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ErrorHandlerContextProvider>{children}</ErrorHandlerContextProvider>;
};

export default AppProviders;
