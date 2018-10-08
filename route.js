const apiUserPath = '/api/v1/user';
let productCategoryRouter = require('./routes/productCategory');
let productRouter = require('./routes/product');

function bootstrap(app) {
    app.get(`${apiUserPath}/productCategories`, productCategoryRouter.show);
    app.get(`${apiUserPath}/products`, productRouter.show);
    app.get(`${apiUserPath}/product/:productId([0-9]+)`, productRouter.index);
    app.post(`${apiUserPath}/product/:productId([0-9]+)/addComment`, productRouter.addComment, productRouter.index);
}

module.exports = bootstrap;