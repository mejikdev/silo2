import User from "../models/User";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import microgen from "../package/sdk/microgen";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function Register(req, res) {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const user = new User(firstName, lastName, email, phoneNumber);

  const existingUsers = await user.Get(null, email);

  if (!existingUsers.length <= 0) {
    return res.status(409).json({
      message: "email already exists",
    });
  }

  const { error, user: userData } = await microgen.auth.register({
    firstName: user.firstName,
    email: user.email,
    lastName: user.lastName,
    password: password,
    phoneNumber: user.phoneNumber,
  });

  if (error) {
    console.log(error, "ERROR");
    return res.status(500).json({
      message: "failed register user",
    });
  }

  user._id = userData._id;

  await user.Add(user);

  user.token = sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

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

  const { error } = await microgen.auth.login({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  const currentUser = existingUsers[0];

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
