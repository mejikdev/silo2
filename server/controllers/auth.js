import User from "../models/User";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function Register(req, res) {
  const { firstName, lastName, email, password, phone } = req.body;

  const user = new User(firstName, lastName, email, password, phone);

  const existingUsers = await user.Get("", email);

  if (!existingUsers.length <= 0) {
    return res.status(409).json({
      message: "email already exists",
    });
  }

  user.password = hashSync(password, 10);
  await user.Add(user);
  user.token = sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  delete user.password;

  res.json(user);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function Login(req, res) {
  const { email, password } = req.body;

  const user = new User();

  const existingUsers = await user.Get(null, email);

  if (existingUsers.length <= 0) {
    return res.status(409).json({
      message: `can't find user with email ${email}!`,
    });
  }

  const currentUser = existingUsers[0];

  const isValidPassword = compareSync(password, currentUser.password);
  if (!isValidPassword) {
    return res.status(400).json({
      message: "invalid password!",
    });
  }

  currentUser.token = await sign(
    {
      id: currentUser._id,
    },
    process.env.JWT_SECRET
  );

  delete currentUser.password;

  res.json(currentUser);
}

export { Register, Login };
