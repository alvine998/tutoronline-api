var DataTypes = require("sequelize").DataTypes;
var _members = require("./members");

function initModels(sequelize) {
  var members = _members(sequelize, DataTypes);


  return {
    members,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
