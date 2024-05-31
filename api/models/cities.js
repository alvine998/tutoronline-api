const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cities', {
    id: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      primaryKey: true
    },
    province_id: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cities',
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
        name: "regencies_province_id_index",
        using: "BTREE",
        fields: [
          { name: "province_id" },
        ]
      },
    ]
  });
};
