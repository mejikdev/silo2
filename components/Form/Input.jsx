import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import * as React from "react";

const StyledInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .Mui-focused": {
    "& input": {
      borderRadius: "8px 8px 0 0",
    },
  },
  "& label": {
    lineHeight: "1em",
  },
  "& input, textarea": {
    padding: "12px 8px",
  },
  "& p": {
    marginLeft: 0,
  },
}));

export const Input = React.memo(function Input({ name, validation, ...props }) {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  return (
    <StyledInput
      fullWidth
      {...register(name, validation)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message ?? ""}
      FormHelperTextProps={{
        sx: {
          fontSize: 12,
        },
      }}
      {...props}
    />
  );
});
