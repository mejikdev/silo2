import { useForm } from "react-hook-form";
import * as React from "react";

export const useAdd = () => {
  const methods = useForm();

  const [isLoading, setIsloading] = React.useState(false);

  const handleSubmit = React.useCallback((data) => {
    setIsloading(true);
    console.log({ data });
  }, []);

  const inputs = React.useMemo(
    () => [
      {
        name: "name",
        label: "Name",
        placeholder: "Agent fullname",
        autoFocus: true,
        type: "text",
        validation: {
          required: {
            value: true,
            message: "Agent name is required!",
          },
        },
      },
    ],
    []
  );

  return {
    inputs,
    isLoading,
    methods,
    handleSubmit,
  };
};
