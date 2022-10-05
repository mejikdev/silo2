import * as React from "react";

import { AddAgent } from "../../features/agent";
import { Layout } from "../../layout/Layout";

const AddAgentPage = () => {
  return <AddAgent />;
};

AddAgentPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddAgentPage;
