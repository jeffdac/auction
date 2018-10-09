const notFound = require('./not_found');

let comments = [
    {id: 1, productId: 1, timestamp: '2018-08-25 10:18:56', user: '陌上离歌', rating: 2, content: '物流给力，东西便宜实惠'},
    {id: 2, productId: 1, timestamp: '2018-08-12 14:18:32', user: '醉红颜', rating: 1, content: '值得购买'},
    {id: 3, productId: 1, timestamp: '2018-08-01 10:45:10', user: '张大强', rating: 2, content: '没用就坏了，不建议购买'},
    {id: 4, productId: 2, timestamp: '2018-07-19 17:10:09', user: '马玉华', rating: 5, content: '值得信赖的店家'},
];
let products = [
    {
        id: 1,
        title: '小米8',
        price: 3499,
        rating: averageRating(1),
        desc: '小米最新品',
        categories: [{id: 1, name: '电子产品'}, {id: 2, name: '硬件设备'}]
    },
    {
        id: 2,
        title: 'iphoneXS',
        price: 6599,
        rating: averageRating(2),
        desc: 'iphone最新品',
        categories: [{id: 1, name: '电子产品'}, {id: 2, name: '硬件设备'}]
    },
    {
        id: 3,
        title: '连衣裙',
        price: 188,
        rating: averageRating(3),
        desc: '女孩子的最爱',
        categories: [{id: 3, name: '服装'}, {id: 4, name: '生活用品'}]
    },
    {
        id: 4,
        title: '哑铃',
        price: 85,
        rating: averageRating(4),
        desc: '炼出你的肌肉',
        categories: [{id: 5, name: '健身器材'}]
    },
    {
        id: 5,
        title: '空调',
        price: 1899,
        rating: averageRating(5),
        desc: '夏日的一丝清凉',
        categories: [{id: 6, name: '家电产品'}, {id: 4, name: '生活用品'}]
    },
    {
        id: 6,
        title: '维达纸巾',
        price: 24.5,
        rating: averageRating(6),
        desc: '老品牌值得信赖',
        categories: [{id: 4, name: '生活用品'}]
    },
    {
        id: 7,
        title: '水仙花',
        price: 28,
        rating: averageRating(7),
        desc: '室内的一道风景',
        categories: [{id: 7, name: '盆栽'}]
    }
];


function show(req, res, next) {
    const categoryId = req.query.categoryId;
    console.log(typeof categoryId, '------');
    if (notFound(categoryId, res)) return;
    if (!categoryId) return res.send({status: true, result: products});
    const filterProducts = products.filter(item => {
        return !!item.categories.find(category => +categoryId === category.id);
    });
    res.send({status: true, result: filterProducts})
}

function index(req, res, next) {
    const productId = req.params.productId;
    const _product = products.find(item => +productId === item.id);
    if (!_product) return next({status: 404});
    const _comment = comments.filter(item => +productId === item.productId);
    res.send({status: true, result: Object.assign(_product, {comments: _comment})});
}


function addComment(req, res, next) {
    comments.unshift({
        id: comments.length + 1,
        productId: +req.params.productId,
        timestamp: new Date(),
        user: `败家娘们儿${comments.length - 3}`,
        rating: req.body.rating,
        content: req.body.content
    });
    next()
}

function averageRating(productId) {
    const filterComments = comments.filter(comment => comment.productId === productId);
    if (!filterComments.length) return 0;
    let total = filterComments.reduce((sum, c) => sum + c.rating, 0);
    return (total / filterComments.length).toFixed(2);
}


module.exports = {
    show,
    index,
    addComment
};

