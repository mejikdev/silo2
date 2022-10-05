import { Alert, Snackbar } from "@mui/material";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useDisclose } from "../hooks/useDisclose";

export const QueryProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleError = (error) => {
    let errorMessage = "";

    if (axios.isAxiosError(error)) {
      const axiosError = error;

      errorMessage = `${
        axiosError.response?.data?.message ?? axiosError.message
      }`;

      if (errorMessage.includes("apikey not found")) {
        return;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    setErrorMessage(errorMessage);
    onOpen();
  };

  const queryClient = React.useRef(
    new QueryClient({
      queryCache: new QueryCache({ onError: handleError }),
      mutationCache: new MutationCache({ onError: handleError }),
    })
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}

      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </QueryClientProvider>
  );
};
