const { User } = require("../../database");

const getUser = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["Password", "Salt"] },
  });
};

const getUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["Password", "Salt"] },
  });
};

module.exports = {
  getUser,
  getUsers,
};
