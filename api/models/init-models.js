var DataTypes = require("sequelize").DataTypes;
var _reports = require("./reports");

function initModels(sequelize) {
  var reports = _reports(sequelize, DataTypes);


  return {
    reports,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
