const userService = require("../services/user-service");
const authService = require("../services/auth-service");

module.exports = {
  getUser: async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUser(id);
    res.json(user);
  },
  getUsers: async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
  },
  registerUser: async (req, res) => {
    const { name, password, email } = req.body;
    const user = await authService.registerUser(name, password, email);
    res.json(user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.getAuthToken(email, password);
    if (token == null) res.status(401).send("Invalid credentials!");
    else res.json({ token });
  },
  authorize: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader;
    try {
      const claims = await authService.verifyToken(token);
      return claims;
    } catch (error) {
      res.status(401).send("Invalid auth token!");
      return null;
    }
  },
};

module.exports.protect = (fun) => {
  const protected = async (req, res) => {
    const claims = await module.exports.authorize(req, res);
    if (claims) {
      await fun(req, res, claims);
    }
  };
  return protected;
};
