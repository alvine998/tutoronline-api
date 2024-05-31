var DataTypes = require("sequelize").DataTypes;
var _ads = require("./ads");
var _brands = require("./brands");
var _categories = require("./categories");
var _cities = require("./cities");
var _districts = require("./districts");
var _partners = require("./partners");
var _provinces = require("./provinces");
var _reports = require("./reports");
var _subcategories = require("./subcategories");
var _types = require("./types");
var _users = require("./users");
var _villages = require("./villages");

function initModels(sequelize) {
  var ads = _ads(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var cities = _cities(sequelize, DataTypes);
  var districts = _districts(sequelize, DataTypes);
  var partners = _partners(sequelize, DataTypes);
  var provinces = _provinces(sequelize, DataTypes);
  var reports = _reports(sequelize, DataTypes);
  var subcategories = _subcategories(sequelize, DataTypes);
  var types = _types(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var villages = _villages(sequelize, DataTypes);


  return {
    ads,
    brands,
    categories,
    cities,
    districts,
    partners,
    provinces,
    reports,
    subcategories,
    types,
    users,
    villages,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
