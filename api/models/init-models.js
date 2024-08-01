var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _talents = require("./talents");
var _tutors = require("./tutors");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var talents = _talents(sequelize, DataTypes);
  var tutors = _tutors(sequelize, DataTypes);


  return {
    admins,
    talents,
    tutors,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
