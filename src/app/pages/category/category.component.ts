import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: ` <div class="container">
    <app-products
      [productsList]="productsList"
      (loadMore)="onLoadMore()"
    ></app-products>
  </div>`,
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private categoryId: string | null;
  private limit: number;
  private offset: number;

  public productsList: Product[];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.categoryId = null;
    this.limit = 10;
    this.offset = 0;

    this.productsList = [];
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          this.offset = 0;

          if (!this.categoryId) return [];

          return this.productsService.getProductsByCategory(
            this.categoryId,
            this.limit,
            this.offset
          );
        })
      )
      .subscribe((data) => {
        this.productsList = data;
        this.offset += this.limit;
      });
  }

  onLoadMore() {
    if (!this.categoryId) return;
    this.productsService
      .getProductsByCategory(this.categoryId, this.limit, this.offset)
      .subscribe((data) => {
        this.productsList = [...this.productsList, ...data];
        this.offset += this.limit;
      });
  }
}
