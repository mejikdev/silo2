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
          { label: "Product Management", value: "Product Management" },
          { label: "Support", value: "Support" },
          { label: "Engineering", value: "Engineering" },
          { label: "Training", value: "Training" },
          { label: "Business Development", value: "Business Development" },
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
          { label: "Marketing Manager", value: "Marketing Manager" },
          { label: "Recruiting Manager", value: "Recruiting Manager" },
          {
            label: "Automation Specialist I",
            value: "Automation Specialist I",
          },
          {
            label: "Quality Control Specialist",
            value: "Quality Control Specialist",
          },
          {
            label: "Software Test Engineer III",
            value: "Software Test Engineer III",
          },
          { label: "Internal Auditor", value: "Internal Auditor" },
          {
            label: "Assistant Media Planner",
            value: "Assistant Media Planner",
          },
          { label: "Quality Engineer", value: "Quality Engineer" },
          { label: "Statistician II", value: "Statistician II" },
          {
            label: "Community Outreach Specialist",
            value: "Community Outreach Specialist",
          },
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
