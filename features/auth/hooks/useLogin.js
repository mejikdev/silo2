import { useForm } from "react-hook-form";
import * as React from "react";

export const useLogin = () => {
  const methods = useForm();

  const [isLoading, setIsloading] = React.useState(false);

  const handleLogin = React.useCallback((data) => {
    setIsloading(true);
    console.log(data);
  }, []);

  const inputs = [
    {
      name: "email",
      label: "Email",
      placeholder: "Your email adress",
      autoFocus: true,
      type: "email",
      validation: {
        required: {
          value: true,
          message: "Email is required!",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Your password adress",
      autoFocus: true,
      type: "password",
      validation: {
        required: {
          value: true,
          message: "Password is required!",
        },
      },
    },
  ];

  return {
    inputs,
    isLoading,
    methods,
    handleLogin,
  };
};
