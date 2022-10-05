import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";

export const createEmployee = (body) =>
  axios.post(`/employees`, body).then((res) => res.data);

export const useCreateEmployee = (options) => {
  const queryClient = useQueryClient();

  const mutationOptions = {
    mutationKey: ["createEmployee"],
    onSettled: () => {
      queryClient.invalidateQueries(["getEmployees"]);
    },
    ...options,
  };

  return useMutation(
    ["createEmployee"],
    (variables) => createEmployee(variables),
    mutationOptions
  );
};
