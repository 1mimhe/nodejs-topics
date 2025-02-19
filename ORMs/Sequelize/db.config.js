const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
    dialect: "mysql", // we should install its driver to.
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql",
    database: "seq-db",
    logging: false // => should be a function (console.log) or false
});

sequelize.authenticate().then(async () => {
    // await sequelize.sync({ force: true });
    console.log("Connected to MySQL.");
}).catch((err) => console.log("DB error:", err.message));

module.exports = sequelize;

/*
Model synchronization:
    User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
    User.sync({ force: true }) - This creates the table, dropping it first if it already existed
    User.sync({ alter: true }) - This checks what is the current state of the table in the database
    (which columns it has, what are their data types, etc),
    and then performs the necessary changes in the table to make it match the model.
*/