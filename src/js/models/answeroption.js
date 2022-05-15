const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "answeroption",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Text: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      Index: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Question_id: {
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
      tableName: "answeroption",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }, { name: "Question_id" }],
        },
        {
          name: "fk_AnswerOption_Question1_idx",
          using: "BTREE",
          fields: [{ name: "Question_id" }],
        },
      ],
    }
  );
};
