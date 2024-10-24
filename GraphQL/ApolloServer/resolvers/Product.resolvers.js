const categoryLoader = require("../loaders/categoryLoader");

const Product = {
    category: (parent, args, context, info) => {
        const { category } = parent;
        const { categories } = context;
        // Regular way: We get it from db.
        // return categories.find(element => element.id === category);
        // Using DataLoader:
        return categoryLoader.load(category);
    }
}

module.exports = {
    Product
}