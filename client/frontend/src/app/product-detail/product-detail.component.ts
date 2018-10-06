import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, Comment, ProductService} from "../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comments: Comment[] = [];

  newRating = 5;
  newComment = '';
  isCommentHidden = true;

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

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), '吴磊', this.newRating, this.newComment);
    this.comments.unshift(comment);

    let total = this.comments.reduce((sum, c) => sum + c.rating, 0);
    this.product.rating = total / this.comments.length;

    this.newComment = '';
    this.newRating = 5;
    this.isCommentHidden = true;
  }

}
