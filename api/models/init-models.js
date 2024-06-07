var DataTypes = require("sequelize").DataTypes;
var _ads = require("./ads");

function initModels(sequelize) {
  var ads = _ads(sequelize, DataTypes);


  return {
    ads,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
