const notFound = require('./not_found');
let products = [
    {
        id: 1,
        title: '小米8',
        price: 35,
        rating: 4,
        desc: '小米最新品',
        categories: [{id: 1, name: '电子产品'}, {id: 2, name: '硬件设备'}]
    },
    {
        id: 2,
        title: 'iphoneXS',
        price: 6599,
        rating: 4.6,
        desc: 'iphone最新品',
        categories: [{id: 1, name: '电子产品'}, {id: 2, name: '硬件设备'}]
    },
    {
        id: 3,
        title: '连衣裙',
        price: 188,
        rating: 3.5,
        desc: '女孩子的最爱',
        categories: [{id: 3, name: '服装'}, {id: 4, name: '生活用品'}]
    },
    {
        id: 4,
        title: '哑铃',
        price: 85,
        rating: 4,
        desc: '炼出你的肌肉',
        categories: [{id: 5, name: '健身器材'}]
    },
    {
        id: 5,
        title: '空调',
        price: 1899,
        rating: 3,
        desc: '夏日的一丝清凉',
        categories: [{id: 6, name: '家电产品'}, {id: 4, name: '生活用品'}]
    },
    {
        id: 6,
        title: '维达纸巾',
        price: 24.5,
        rating: 2.5,
        desc: '老品牌值得信赖',
        categories: [{id: 4, name: '生活用品'}]
    },
    {
        id: 7,
        title: '水仙花',
        price: 28, rating: 1.6,
        desc: '室内的一道风景',
        categories: [{id: 7, name: '盆栽'}]
    }
];

function show(req, res, next) {
    const categoryId = req.query.categoryId;
    if (notFound(categoryId, res)) return;
    if (!categoryId) return res.send({status: true, result: products});
    const filterProducts = products.filter(item => {
        return item.categories.find(category => +categoryId === category.id) !== -1;
    });
    res.send({status: true, result: filterProducts})
}

function index(req, res, next) {
    const productId = req.param('productId');
    if (notFound(productId, res)) return;
    const _product = products.find(item => +productId === item.id);
    if (_product) {
        res.send({status: true, result: _product})
    } else {
        res.send({status: false, message: 'not found'})
    }
}

module.exports = {
    show,
    index
};

