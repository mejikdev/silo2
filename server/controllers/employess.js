import Employee from "../models/Employee";
import microgen from "../package/sdk/microgen";
import moment from "moment";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const Create = async (req, res) => {
  const { name, title, department, salary, dateOfHired } = req.body;

  const date = moment(new Date(dateOfHired)).format("YYYY-MM-DD");

  let employee = new Employee(name, title, department, salary, date);

  const { data, error } = await microgen.service("employees").create(employee);
  if (error) {
    console.log("failed create employees: ", error);

    return res.status(500).json({
      message: "failed create employees",
    });
  }

  employee._id = data._id;
  await employee.Add(employee);

  res.json(employee);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const List = async (req, res) => {
  const employee = new Employee();

  const employees = await employee.Get(null, req.query);

  res.json(employees);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const Update = async (req, res) => {
  const { id } = req.query;
  const { name, title, department, salary, dateOfHired } = req.body;

  let employee = new Employee(name, title, department, salary, dateOfHired);

  if (employee.dateOfHired) {
    employee.dateOfHired = moment(new Date(dateOfHired)).format("YYYY-MM-DD");
  }

  await employee.Update(id, employee);

  const employees = await employee.Get(id);

  const { error } = await microgen
    .service("employees")
    .updateById(id, employee);

  if (error) {
    console.log("failed update employees: ", error);

    return res.status(500).json({
      message: "failed update employees",
    });
  }

  res.json(employees[0]);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const FindById = async (req, res) => {
  const { id } = req.query;
  const employee = new Employee();

  const employees = await employee.Get(id);

  if (employees.length <= 0) {
    return res.status(404).json({
      message: `employee with id ${id} not found!`,
    });
  }

  res.json(employees[0]);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const Delete = async (req, res) => {
  const { id } = req.query;

  const employee = new Employee();

  const { error } = await microgen.service("employees").deleteById(id);
  if (error) {
    console.log("failed delete employees: ", error);

    return res.status(500).json({
      message: "failed delete employees",
    });
  }

  const employees = await employee.Get(id);

  if (employees.length <= 0) {
    return res.status(404).json({
      message: `employee with id ${id} not found!`,
    });
  }

  await employee.Delete(id);

  res.status(204).json("ok");
};

export { Create, List, Update, FindById, Delete };
