const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "questionfeedback",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Comment: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      PollFeedback_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "pollfeedback",
          key: "id",
        },
      },
      Answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "answer",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "questionfeedback",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
            { name: "PollFeedback_id" },
            { name: "Answer_id" },
          ],
        },
        {
          name: "fk_QuestionFeedback_PollFeedback1_idx",
          using: "BTREE",
          fields: [{ name: "PollFeedback_id" }],
        },
        {
          name: "fk_QuestionFeedback_Answer_idx",
          using: "BTREE",
          fields: [{ name: "Answer_id" }],
        },
      ],
    }
  );
};
