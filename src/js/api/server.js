const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello");
});

for (const route of routes) {
  app[route.method](route.path, route.func);
}

module.exports = app;
