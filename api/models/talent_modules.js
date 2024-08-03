const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('talent_modules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    talent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'talents',
        key: 'id'
      }
    },
    talent_username: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    talent_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tutors',
        key: 'id'
      }
    },
    tutor_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    tutor_username: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modules',
        key: 'id'
      }
    },
    module_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    modul_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('waiting','paid','unpaid','pending'),
      allowNull: false,
      defaultValue: "waiting"
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
    tableName: 'talent_modules',
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
        name: "talent_id",
        using: "BTREE",
        fields: [
          { name: "talent_id" },
        ]
      },
      {
        name: "tutor_id",
        using: "BTREE",
        fields: [
          { name: "tutor_id" },
        ]
      },
      {
        name: "module_id",
        using: "BTREE",
        fields: [
          { name: "module_id" },
        ]
      },
    ]
  });
};
