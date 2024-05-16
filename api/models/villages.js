const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('villages', {
    id: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    district_id: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      references: {
        model: 'districts',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'villages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "villages_district_id_index",
        using: "BTREE",
        fields: [
          { name: "district_id" },
        ]
      },
    ]
  });
};
