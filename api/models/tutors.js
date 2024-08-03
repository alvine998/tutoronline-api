const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tutors', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('L','P'),
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    nik: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ktp: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    npwp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bank: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    educations: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "[{level:\"S1\", school:\"University\", country:\"Indonesia\", faculty:\"Sience\", scholarship:\"From where\"}]"
    },
    ktm: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    research_method: {
      type: DataTypes.ENUM('kualitatif','kuantitatif'),
      allowNull: true
    },
    consult_media_preference: {
      type: DataTypes.ENUM('online','offline','online/offline'),
      allowNull: false
    },
    documents: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "[{name:\"TOEFL\", image:\"toefl.jpg\"}]"
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
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
    tableName: 'tutors',
    hasTrigger: true,
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
