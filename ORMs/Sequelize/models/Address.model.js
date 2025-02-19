const { DataTypes } = require("@sequelize/core");
const sequelize = require("../db.config");

const Address = sequelize.define("address", {
    address: {
        type: DataTypes.STRING
    }
});

module.exports = Address;