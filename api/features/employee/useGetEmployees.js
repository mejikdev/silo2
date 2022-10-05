import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";

export const getEmployees = () =>
  axios.get(`/employees`).then((res) => res.data);

export const useGetEmployees = () =>
  useQuery(["getEmployees"], () => getEmployees());
