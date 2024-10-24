const Category = {
    products: (parent, args, context, info) => {
        const { id } = parent;
        let { products } = context;
        const { filters } = args;
        
        products = products.filter(element => element.category === id);
        if (filters) {
            if (typeof filters?.onSale === "boolean") {
                products = products.filter(element => element.onSale === filters.onSale);
            }
        }

        return products;
    }
}

module.exports = {
    Category
}