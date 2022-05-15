const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('whitelisteduser', {
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    Organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'organization',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'whitelisteduser',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_Id" },
          { name: "Organization_id" },
        ]
      },
      {
        name: "fk_WhitelistedUser_User1_idx",
        using: "BTREE",
        fields: [
          { name: "User_Id" },
        ]
      },
      {
        name: "fk_WhitelistedUser_Organization1_idx",
        using: "BTREE",
        fields: [
          { name: "Organization_id" },
        ]
      },
    ]
  });
};
