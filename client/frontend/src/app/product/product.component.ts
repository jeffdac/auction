import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from "../share/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    try {
      this.products = await this.productService.getProducts();
    } catch (err) {

    }
  }

}


