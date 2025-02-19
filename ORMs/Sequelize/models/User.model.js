const { Model, DataTypes } = require("@sequelize/core");
const sequelize = require("../db.config");
const Address = require("./Address.model");

class User extends Model {}
User.init({
    // it set id default.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        defaultValue: "Bio"
    },
    city: {
        type: DataTypes.STRING(50)
    },
    national_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            // min: 18
            min: {
                args: [18],
                msg: "You should be at least 18 years old."
            }
        }
    },
    /*
    address: {
        type: DataTypes.INTEGER,
        // Makes this attribute a foreign key.
        // *** We typically don't need to use this yourself, instead use associations.
        references: {
            model: Address,
            key: "id"
        }
    },
    */
    username: {
        type: DataTypes.STRING(50), // varchar(50)
        // Constraints are rules defined at SQL level.
        unique: true, // also we can set an index name (instead of true) => "usernameIndex"
        allowNull: false,
        // Validations are checks performed in the Sequelize level.
        // If a validation fails, no SQL query will be sent to the database at all.
        validate: {
            // is/not => /^[a-z]+$/i [matches/does not match this RegExp]
            isAlphanumeric: true,
            len: [2, 50],
            // Custom validators:
            customValidator(value) {
                // if ... throw new Error
                // value => Current field's value.
                // this => The created user
            }
        }
    },
    isPrivate: DataTypes.BOOLEAN, // MySQL doesn't have boolean. ORM save it as a TINYINT(1) in database (0/1).
    date: DataTypes.DATE,
}, {
    sequelize,
    modelName: "user",
    // timestamps: false => default is true
    // freezeTableName =>  we can stop the auto-pluralization or set 'tableName'.
    paranoid: true
    // A paranoid table is one that, when told to delete a record, it will not truly delete it (soft-deletion). 
    // Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.
});

// Association:
User.hasMany(Address);
Address.belongsTo(User);

module.exports = User;