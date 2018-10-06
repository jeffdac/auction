const notFound = require('./not_found');
let categories = [
    {id: 1, name: '电子产品'},
    {id: 2, name: '硬件设备'},
    {id: 3, name: '服装'},
    {id: 4, name: '生活用品'},
    {id: 5, name: '健身器材'},
    {id: 6, name: '家电产品'},
    {id: 7, name: '盆栽'}];

function show(req, res, next) {
    const categoryId = req.query.categoryId;
    if (notFound(categoryId, res)) return;
    if (!categoryId) return res.send({status: true, result: categories});
    const category = categories.filter(item => +categoryId === item.id);
    res.send({status: true, result: category});
}

module.exports = {
    show
};