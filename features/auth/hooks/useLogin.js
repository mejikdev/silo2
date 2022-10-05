import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useLoginMutation } from "../../../api/features/auth";
import { setCookie } from "../../../utils/cookie";

export const useLogin = () => {
  const methods = useForm();
  const router = useRouter();

  const { mutateAsync, isLoading } = useLoginMutation();

  const handleLogin = React.useCallback(
    async (data) => {
      try {
        const result = await mutateAsync(data);
        setCookie("token", result.token);
        setTimeout(() => {
          router.replace("/employee");
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
    [mutateAsync, router]
  );

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
