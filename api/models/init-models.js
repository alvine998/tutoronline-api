var DataTypes = require("sequelize").DataTypes;
var _apps = require("./apps");
var _customers = require("./customers");
var _users = require("./users");

function initModels(sequelize) {
  var apps = _apps(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    apps,
    customers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
