import Employee from "../models/Employee";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const Create = async (req, res) => {
  const { name, title, department, salary, dateOfHired } = req.body;

  let employee = new Employee(name, title, department, salary, dateOfHired);

  employee = await employee.Add(employee);

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

  await employee.Update(id, employee);

  const employees = await employee.Get(id);

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
