import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, Comment, ProductService} from "../share/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comments: Comment[] = [];

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    const productId = this.routeInfo.snapshot.params['productId'];
    this.getProduct(productId);
    this.getComments(productId);
  }

  async getProduct(id: number) {
    try {
      this.product = await this.productService.getProduct(id);
    } catch (err) {

    }
  }

  async getComments(id: number) {
    try {
      this.comments = await this.productService.getCommentsForProductId(id);
      console.log(this.comments);
    } catch (err) {

    }
  }

}
