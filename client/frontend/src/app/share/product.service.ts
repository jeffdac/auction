import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    new Product(1, '小米8', 35, 4, '小米最新品', ['电子产品', '硬件设备']),
    new Product(2, 'iphoneXS', 6599, 4.6, 'iphone最新品', ['电子产品', '硬件设备']),
    new Product(3, '连衣裙', 188, 3.5, '女孩子的最爱', ['服装', '生活用品']),
    new Product(4, '哑铃', 85, 4, '炼出你的肌肉', ['健身器材']),
    new Product(5, '空调', 1899, 3, '夏日的一丝清凉', ['家电产品', '生活用品']),
    new Product(6, '维达纸巾', 24.5, 2.5, '老品牌值得信赖', ['生活用品']),
    new Product(7, '水仙花', 28, 1.6, '室内的一道风景', ['盆栽']),
  ];

  comments: Comment[] = [
    new Comment(1, 1, '2018-08-25 10:18:56', '陌上离歌', 3, '物流给力，东西便宜实惠'),
    new Comment(2, 1, '2018-08-12 14:18:32', '醉红颜', 4, '值得购买'),
    new Comment(3, 1, '2018-08-01 10:45:10', '张大强', 2, '没用就坏了，不建议购买'),
    new Comment(4, 2, '2018-07-19 17:10:09', '马玉华', 5, '值得信赖的店家'),
  ];

  constructor() {
  }

  getAllCategories() {
    return [{id: 1, name: '电子产品'}, {id: 2, name: '硬件设备'}, {id: 3, name: '服装'}, {id: 4, name: '生活用品'}, {
      id: 5,
      name: '健身器材'
    }, {id: 6, name: '家电产品'}, {id: 7, name: '盆栽'}];
  }

  getProducts() {
    return this.products;
  }

  getProduct(id: number) {
    return this.products.find((product: any) => product.id == id);
  }

  getCommentsForProductId(id: number) {
    return this.comments.filter((comment: any) => comment.productId == id);
  }


}


export class Product {
  constructor(public id: number,
              public title: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {

  }
}

export class Comment {
  constructor(public id: number,
              public productId: number,
              public timestamp: string,
              public user: string,
              public rating: number,
              public content: string) {

  }
}
