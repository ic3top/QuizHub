const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "answer",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Content: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      PollResult_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "pollresult",
          key: "id",
        },
      },
      Question_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "question",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "answer",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
            { name: "PollResult_id" },
            { name: "Question_Id" },
          ],
        },
        {
          name: "fk_Answer_PollResult1_idx",
          using: "BTREE",
          fields: [{ name: "PollResult_id" }],
        },
        {
          name: "fk_Answer_Question_idx",
          using: "BTREE",
          fields: [{ name: "Question_Id" }],
        },
      ],
    }
  );
};
