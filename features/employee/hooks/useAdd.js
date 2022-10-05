import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useCreateEmployee } from "../../../api/features/employee";

export const useAdd = () => {
  const methods = useForm();
  const router = useRouter();

  const { mutateAsync, isLoading } = useCreateEmployee();

  const handleSubmit = React.useCallback(
    async (data) => {
      try {
        data.dateOfHired = new Date().toISOString();
        await mutateAsync(data);
        router.push("/employee");
      } catch (error) {
        console.log("failed to create employee", error);
      }
    },
    [mutateAsync, router]
  );

  const inputs = React.useMemo(
    () => [
      {
        name: "name",
        label: "Name",
        placeholder: "Employee fullname",
        autoFocus: true,
        type: "text",
        validation: {
          required: {
            value: true,
            message: "Employee name is required!",
          },
        },
      },
      {
        name: "department",
        label: "Department",
        placeholder: "Employee department",
        type: "select",
        options: [
          { label: "Human Resource", value: "Human Resource" },
          { label: "Legal", value: "Legal" },
          { label: "Services", value: "Services" },
          { label: "Support", value: "Support" },
          { label: "Marketing", value: "Marketing" },
          { label: "Engineering", value: "Engineering" },
        ],
        validation: {
          required: {
            value: true,
            message: "Employee department is required!",
          },
        },
      },
      {
        name: "title",
        label: "Position",
        placeholder: "Employee position",
        type: "select",
        options: [
          { label: "VP Engineer", value: "VP Engineer" },
          { label: "Staff CS", value: "Staff CS" },
          { label: "Staff Accountant", value: "Staff Accountant" },
          { label: "Staff Marketing", value: "Staff Marketing" },
          { label: "Frontend Developer", value: "Frontend Developer" },
          { label: "Backend Developer", value: "Backend Developer" },
        ],
        validation: {
          required: {
            value: true,
            message: "Employee position is required!",
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
