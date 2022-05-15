const sequelize = require("./db.js");
const init = require("../models/init-models.js");
module.exports = init(sequelize);
