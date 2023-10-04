var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _assets = require("./assets");
var _banks = require("./banks");
var _places = require("./places");
var _transactions = require("./transactions");
var _users = require("./users");
var _vouchers = require("./vouchers");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var assets = _assets(sequelize, DataTypes);
  var banks = _banks(sequelize, DataTypes);
  var places = _places(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vouchers = _vouchers(sequelize, DataTypes);


  return {
    admins,
    assets,
    banks,
    places,
    transactions,
    users,
    vouchers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
