const Query = {
    products: (parent, args, context, info) => {
        let { products } = context;
        const { authorization }= context.req.headers;
        console.log("authorization: " + authorization);
        const { filters } = args;
        
        if (filters) {
            if (typeof filters?.onSale === "boolean") {
                products = products.filter(element => element.onSale === filters.onSale);
            }
        }

        return products;
    },
    product: (parent, args, context, info) => {
        const { id } = args;
        const { products } = context;
        return products.find(element => element.id === id);
    },
    categories: (parent, args, context, info) => categories,
    category: (parent, args, context, info) => {
        const { id } = args;
        const { categories } = context;
        return categories.find(element => element.id === id);
    }
}

module.exports = {
    Query
}