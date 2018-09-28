const apiUserPath = '/api/v1/user';
let productCategoryRouter = require('./routes/productCategory');
let productRouter = require('./routes/product');

function bootstrap(app) {
    app.get(`${apiUserPath}/productCategories`, productCategoryRouter.show);
    app.get(`${apiUserPath}/products`, productRouter.show);
    app.get(`${apiUserPath}/products/:productId([0-9]+)`, productRouter.index);
}

module.exports = bootstrap;