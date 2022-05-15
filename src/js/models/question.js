const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "question",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Title: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      Poll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "poll",
          key: "id",
        },
      },
      QuestionType_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "questiontype",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "question",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
            { name: "Poll_id" },
            { name: "QuestionType_id" },
          ],
        },
        {
          name: "fk_Question_Poll1_idx",
          using: "BTREE",
          fields: [{ name: "Poll_id" }],
        },
        {
          name: "fk_Question_QuestionType1_idx",
          using: "BTREE",
          fields: [{ name: "QuestionType_id" }],
        },
      ],
    }
  );
};
