const users = require("./controllers/user-controller");
const { protect } = require("./controllers/user-controller");

const routes = [
  { path: "/users/:id", method: "get", func: protect(users.getUser) },
  { path: "/users", method: "get", func: protect(users.getUsers) },
  { path: "/register", method: "post", func: users.registerUser },
  { path: "/login", method: "post", func: users.login },
];

module.exports = routes;
