const { verify } = require("jsonwebtoken");

const AuthMiddleware = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return null;

  const token = authorization.split("Bearer ")[1];

  if (!token) null;

  const validate = verify(token, process.env.JWT_SECRET);

  if (!validate) return null;

  return validate.id;
};

export { AuthMiddleware };
