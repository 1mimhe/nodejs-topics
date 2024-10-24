const { randomUUID } = require("crypto");
const fs = require("fs");

const Mutation = {
    createCategory: (parent, args, { categories }, info) => {
        const { input } = args;
        input.id = randomUUID();
        categories.push(input);
        fs.writeFileSync("./data/categories.json", JSON.stringify(categories));

        return categories[categories.length - 1];
    }
}

module.exports = {
    Mutation
}