import MUIButton, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import * as React from "react";

const BaseButton = styled(MUIButton)({
  fontWeight: "500",
  textTransform: "capitalize",
});

export const Button = React.memo(function Button({
  disabled,
  isLoading,
  startIcon,
  ...props
}) {
  const loaderSize = React.useMemo(() => {
    switch (props.size) {
      case "large":
        return 18;

      case "small":
        return 12;

      default:
        return 14;
    }
  }, [props.size]);

  return (
    <BaseButton
      {...props}
      disabled={isLoading ? true : disabled}
      startIcon={isLoading ? <CircularProgress size={loaderSize} /> : startIcon}
    />
  );
});
