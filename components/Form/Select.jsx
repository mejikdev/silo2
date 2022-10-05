import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";
import * as React from "react";

export const Select = styled(({ name, options, validation, ...props }) => {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <MUISelect
        {...register(name, validation)}
        {...props}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message ?? ""}
        fullWidth
      >
        {[...(options ?? [])].map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
})(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .Mui-focused": {
    "& input": {
      borderRadius: "8px 8px 0 0",
    },
  },
  // "& label": {
  //   lineHeight: "1em",
  // },
  "& input, textarea": {
    padding: "12px 8px",
  },
  "& p": {
    marginLeft: 0,
  },
}));
