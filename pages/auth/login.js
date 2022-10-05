import * as React from "react";

import { Login } from "../../features/auth";
import { Layout } from "../../layout/Layout";

const LoginPage = () => {
  return <Login />;
};

LoginPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
