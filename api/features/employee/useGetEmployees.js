import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const getEmployees = () =>
  axios.get(`api/employees`).then((res) => res.data);

export const useGetEmployees = () =>
  useQuery(["getEmployees"], () => getEmployees());
