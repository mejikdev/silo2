import { Employee } from "../../features/employee/routes/Employee";
import { Layout } from "../../layout/Layout";

const EmployeePage = () => {
  return <Employee />;
};

EmployeePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default EmployeePage;
