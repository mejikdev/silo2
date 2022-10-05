import * as React from "react";

import { AddEmployee } from "../../features/employee";
import { Layout } from "../../layout/Layout";

const AddEmployeePage = () => {
  return <AddEmployee />;
};

AddEmployeePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddEmployeePage;
