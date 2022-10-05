import { Box, styled } from "@mui/material";
import { FormProvider } from "react-hook-form";
import * as React from "react";

import { Input } from "./Input";
import { Select } from "./Select";
import { Button } from "../common/Button";

const FormElement = styled("form")({});

export const Form = React.memo(function Form({
  methods,
  inputs,
  isLoading,
  loadingSubmitText,
  submitText,
  onSubmit,
}) {
  const renderInput = React.useCallback((inputProps) => {
    let children;

    switch (inputProps.type) {
      case "select":
        children = <Select {...inputProps} />;
        break;

      default:
        children = <Input {...inputProps} />;
        break;
    }

    return <Box>{children}</Box>;
  }, []);

  return (
    <FormProvider {...methods}>
      <FormElement onSubmit={methods.handleSubmit(onSubmit)}>
        {inputs.map(renderInput)}
        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" type="submit" isLoading={isLoading}>
            {isLoading
              ? loadingSubmitText ?? "Submitting"
              : submitText ?? "Submit"}
          </Button>
        </Box>
      </FormElement>
    </FormProvider>
  );
});
