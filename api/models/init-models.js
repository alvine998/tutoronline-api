var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _modules = require("./modules");
var _talent_modules = require("./talent_modules");
var _talents = require("./talents");
var _tutor_modules = require("./tutor_modules");
var _tutors = require("./tutors");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var talent_modules = _talent_modules(sequelize, DataTypes);
  var talents = _talents(sequelize, DataTypes);
  var tutor_modules = _tutor_modules(sequelize, DataTypes);
  var tutors = _tutors(sequelize, DataTypes);

  talent_modules.belongsTo(modules, { as: "module", foreignKey: "module_id"});
  modules.hasMany(talent_modules, { as: "talent_modules", foreignKey: "module_id"});
  talent_modules.belongsTo(talents, { as: "talent", foreignKey: "talent_id"});
  talents.hasMany(talent_modules, { as: "talent_modules", foreignKey: "talent_id"});
  talent_modules.belongsTo(tutors, { as: "tutor", foreignKey: "tutor_id"});
  tutors.hasMany(talent_modules, { as: "talent_modules", foreignKey: "tutor_id"});

  return {
    admins,
    modules,
    talent_modules,
    talents,
    tutor_modules,
    tutors,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
