import { Login } from "../../server/controllers/auth";
import { AuthMiddleware } from "../../server/middleware/auth";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return Login(req, res);
    default:
      return res.status(404).json(404);
  }
}
