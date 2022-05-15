const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "pollfeedback",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      GeneralComment: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      Creator_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "id",
        },
      },
      PollResult_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "pollresult",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "pollfeedback",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
            { name: "Creator_Id" },
            { name: "PollResult_Id" },
          ],
        },
        {
          name: "fk_PollFeedback_User_idx",
          using: "BTREE",
          fields: [{ name: "Creator_Id" }],
        },
        {
          name: "fk_PollFeedback_PollResult",
          using: "BTREE",
          fields: [{ name: "PollResult_Id" }],
        },
      ],
    }
  );
};
