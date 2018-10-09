import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    try {
      this.products = (await this.productService.getProducts({categoryId: null})).result;
    } catch (err) {

    }
  }

}


