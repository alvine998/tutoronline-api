const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    birth_place: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    clasification: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    personel_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tool_type: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    regis_no: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    expired_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    instance: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'members',
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
    ]
  });
};
