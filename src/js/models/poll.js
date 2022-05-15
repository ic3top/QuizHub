const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "poll",
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
      "Creation date": {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      "End date": {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      IsPrivate: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      Link: {
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
      Organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "organization",
          key: "id",
        },
      },
      PollType_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "polltype",
          key: "Id",
        },
      },
    },
    {
      sequelize,
      tableName: "poll",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
            { name: "Organization_id" },
            { name: "Creator_Id" },
            { name: "PollType_Id" },
          ],
        },
        {
          name: "fk_Pool_User1_idx",
          using: "BTREE",
          fields: [{ name: "Creator_Id" }],
        },
        {
          name: "fk_Pool_Organization1_idx",
          using: "BTREE",
          fields: [{ name: "Organization_id" }],
        },
        {
          name: "fk_Poll_PollType1_idx",
          using: "BTREE",
          fields: [{ name: "PollType_Id" }],
        },
      ],
    }
  );
};
