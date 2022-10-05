const { verify } = require("jsonwebtoken");
import User from "../models/User";

const AuthMiddleware = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return null;

    const token = authorization.split("Bearer ")[1];

    if (!token) null;

    const validate = verify(token, process.env.JWT_SECRET);

    if (!validate) return null;

    const user = new User();

    const users = await user.Get(validate.id);

    if (users.length <= 0) {
      return null;
    }

    return validate.id;
  } catch (error) {
    return null;
  }
};

export { AuthMiddleware };
