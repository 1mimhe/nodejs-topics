const { Op } = require("@sequelize/core/_non-semver-use-at-your-own-risk_/operators.js");
const User = require("./models/User.model");
const sequelize = require("./db.config");

async function create() {
    // await User.sync({ alter: true });

    // create
    const user1 = await User.create({
        username: "1mimhe",
        date: new Date()
    });
    console.log(user1.toJSON());
    /*
    {
        id: 2,
        username: '1mimhe',
        date: 2024-11-20T17:56:28.094Z,
        updatedAt: 2024-11-20T17:56:28.096Z,
        createdAt: 2024-11-20T17:56:28.096Z
    }
    */
    
    // build
    const user2 = User.build({
        username: "mimhe",
        date: new Date()
    });
    const result = await user2.save();
    console.log(result.dataValues);

    // bulkCreate
    const users = await User.bulkCreate([
        { username: "2mimhe", date: new Date() },
        { username: "3mimhe", date: new Date() },
        { username: "4mimhe", date: new Date() },
        { username: "5mimhe", date: new Date() },
        { username: "6mimhe", date: new Date() },
        { username: "7mimhe", date: new Date() },
        { username: "8mimhe", date: new Date() },
        { username: "9mimhe", date: new Date() },
        { username: "10mimhe", date: new Date() },
    ]);
    console.log(users.map(user => user.dataValues));

    // findOrCreate
    const [user, isCreated] = await User.findOrCreate({
        where: {
            [Op.or]: [
                { username: "1mimhe" }, 
                { email: "1mimhe@example.com" }
            ]
        },
        defaults: {
            date: new Date(),
            bio: "I'm an engineer."
        } // create a user includes username to.
        // fields => If set, only columns matching those in fields will be saved.
    });
    console.log(user.toJSON(), isCreated);
    /*
    {
      id: 1,
      username: '1mimhe',
      bio: null,
      isPrivate: null,
      date: 2024-11-20T17:56:14.000Z,
      createdAt: 2024-11-20T17:56:14.805Z,
      updatedAt: 2024-11-20T17:56:14.805Z
    } false
    */
}
// create();

async function findAll() {
    const users = await User.findAll({
        where: {
            age: {
                [Op.gte]: 25
                // [Op.in]: [25, 27]
            }
        },
        // SELECT
        attributes: ["first_name", "last_name", ["username", "user_name"], "age"], // username AS user-name
        order: [
            ["age", "DESC"],
            ["last_name", "ASC"]
        ],
        // pagination
        limit: 5,
        offset: (0 * 5), // offset (skip + 1): page * limit
        raw: true // If raw doesn't set, we should map result.
    });
    console.log(users);
}
// findAll();

async function findOne() {
    const user = await User.findOne({
        where: {
            username: "1mimhe"
        },
        raw: true
    });
    console.log(user);

    // findByPk => findByPrimaryKey
    const user2 = await User.findByPk(5, { raw: true });
    console.log(user2);
}
// findOne();

async function utilityMethods() {
    const { rows, count } = await User.findAndCountAll({
        where: {
            age: {
                [Op.gte]: 25
            },
            city: {
                [Op.and]: [
                    { [Op.not]: "city" },
                    { [Op.like]: "%City" }
                ]
            }
        },
        raw: true
    });
    console.log(rows, count); // [...] 2
    // .count()

    const sum = await User.sum("age");
    const max = await User.max("age");
    const min = await User.min("age");
    console.log(sum, max, min); // 851 45 20

    const result = await User.increment("age", { where: { id: 1 } }); // or { age: 5 }
    console.log(result);
}
// utilityMethods();

// [[sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']]

async function group() {
    const users = await User.findAll({
        attributes: [
            "city",
            [sequelize.fn("COUNT", sequelize.col('username')), "user_counts"]
        ],
        group:"city",
        raw: true // If raw doesn't set, we should map result.
    });
    console.log(users);
}
// group();

async function update() {
    // 1
    const user = await User.findOne({
        where: {
            username: "1mimhe"
        }
        // must not set raw as true.
    });
    user.age = 23;
    await user.save();
    await user.reload();
    console.log(user);
    
    // 2
    const result = await User.update({
        first_name: "Ali"
    }, {
        where: {
            username: "johnk23"
        },
        raw: true
    });
    console.log(result);

    // Saving only some fields
    // await User.save({ fields: ['name'] });
}
// update();

async function delete_() {
    // 1
    const user = await User.findOne({
        where: {
            username: "Mammad_TrailBlazer22"
        }
    });
    await user.destroy();

    // 2
    const result = await User.destroy({
        where: {
            last_name: "Shariati"
        }
    });
    
    // await User.truncate();
    // await User.destroy();
}
// delete_();

async function restore() {
    // To restore soft-deleted records (In paranoid tables).
    await User.restore({
        where: {
          // ...
        }
    });

    //
    const users = await User.findAll({
        where: {
            // ...
        },
        paranoid: false // This will also retrieve soft-deleted records
    });
}