import { Create, List } from "../../../server/controllers/employess";
import { AuthMiddleware } from "../../../server/middleware/auth";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export default function handler(req, res) {
  const userId = AuthMiddleware(req, res);
  if (userId == null) {
    return res.status(401).json({
      message: "unauthorized user!",
    });
  }

  req.userId = userId;

  switch (req.method) {
    case "POST":
      return Create(req, res);
    case "GET":
      return List(req, res);
    default:
      return res.status(404).json(404);
  }
}
