const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "pollresult",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      Comment: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      Poll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "poll",
          key: "PollType_Id",
        },
      },
      User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "pollresult",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }, { name: "Poll_id" }, { name: "User_id" }],
        },
        {
          name: "PollResult_User_idx",
          using: "BTREE",
          fields: [{ name: "User_id" }],
        },
        {
          name: "PollResult_Poll_idx",
          using: "BTREE",
          fields: [{ name: "Poll_id" }],
        },
      ],
    }
  );
};
