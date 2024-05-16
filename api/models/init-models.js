var DataTypes = require("sequelize").DataTypes;
var _ads = require("./ads");
var _brands = require("./brands");
var _categories = require("./categories");
var _cities = require("./cities");
var _districts = require("./districts");
var _partners = require("./partners");
var _provinces = require("./provinces");
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
  var subcategories = _subcategories(sequelize, DataTypes);
  var types = _types(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var villages = _villages(sequelize, DataTypes);

  ads.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(ads, { as: "ads", foreignKey: "brand_id"});
  types.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(types, { as: "types", foreignKey: "brand_id"});
  districts.belongsTo(cities, { as: "city", foreignKey: "city_id"});
  cities.hasMany(districts, { as: "districts", foreignKey: "city_id"});
  villages.belongsTo(districts, { as: "district", foreignKey: "district_id"});
  districts.hasMany(villages, { as: "villages", foreignKey: "district_id"});
  cities.belongsTo(provinces, { as: "province", foreignKey: "province_id"});
  provinces.hasMany(cities, { as: "cities", foreignKey: "province_id"});
  ads.belongsTo(types, { as: "type", foreignKey: "type_id"});
  types.hasMany(ads, { as: "ads", foreignKey: "type_id"});

  return {
    ads,
    brands,
    categories,
    cities,
    districts,
    partners,
    provinces,
    subcategories,
    types,
    users,
    villages,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
