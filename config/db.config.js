require('dotenv').config()

module.exports = {
    HOST: "103.163.138.107",
    USER: "bengke51_root",
    PASSWORD: "@BengkelSehat1!!",
    DB: "bengke51_membership",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};