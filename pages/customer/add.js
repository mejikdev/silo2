import * as React from "react";

import { AddCustomer } from "../../features/customer";
import { Layout } from "../../layout/Layout";

const AddCustomerPage = () => {
  return <AddCustomer />;
};

AddCustomerPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddCustomerPage;
