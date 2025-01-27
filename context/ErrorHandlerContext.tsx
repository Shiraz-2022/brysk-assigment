import React, { createContext, useCallback, useContext, useState } from "react";

interface ErrorContextType {
  error: Error | null;
  setError: (error: Error) => void;
  clearError: () => void;
}

const ErrorHandlerContext = createContext<ErrorContextType | undefined>(
  undefined
);

export const ErrorHandlerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [error, setErrorState] = useState<Error | null>(null);

  const setError = useCallback((error: Error) => {
    setErrorState(error);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return (
    <ErrorHandlerContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export const useErrorHandler = (): ErrorContextType => {
  const context = useContext(ErrorHandlerContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
