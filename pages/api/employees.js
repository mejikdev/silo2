// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import employees from "../../public/mock/data/employees.json";

export default function handler(req, res) {
  res.status(200).json(employees);
}
