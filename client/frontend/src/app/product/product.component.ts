import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<Product>;

  constructor() {
  }

  ngOnInit() {
    this.products = [
      new Product(1, '小米8', 35, 4, '小米最新品', ['电子产品', '硬件设备']),
      new Product(2, 'iphoneX', 6599, 4.6, '小米最新品', ['电子产品', '硬件设备']),
      new Product(3, '连衣裙', 188, 3.5, '女孩子的最爱', ['服装', '生活用品']),
      new Product(4, '哑铃', 85, 4, '炼出你的肌肉', ['健身器材']),
      new Product(5, '空调', 1899, 3, '夏日的一丝清凉', ['家电产品', '生活用品']),
      new Product(6, '维达纸巾', 24.5, 2.5, '老品牌值得信赖', ['生活用品']),
      new Product(7, '水仙花', 28, 1.6, '室内的一道风景', ['盆栽']),
    ];
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
