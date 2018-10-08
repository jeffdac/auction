import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  productId: number;
  comments: any = [];

  newRating = 5;
  newComment = '';
  isCommentHidden = true;

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.productId = this.routeInfo.snapshot.params['productId'];
    this.getProduct();
  }

  async getProduct() {
    try {
      this.product = (await this.productService.getProduct(this.productId)).result;
    } catch (err) {

    }
  }

  async addComment() {
    const body = {
      rating: this.newRating,
      content: this.newComment
    };
    this.product = (await this.productService.addComment(this.productId, body)).result;
    this.newComment = '';
    this.newRating = 5;
    this.isCommentHidden = true;
  }

}
