import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public productsList: Product[];
  public limit: number;
  public offset: number;
  public productId: string | null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.productsList = [];
    this.limit = 10;
    this.offset = 0;
    this.productId = null;
  }

  ngOnInit(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.productsList = data;
        this.offset += this.limit;
      });

    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
  }

  public onLoadMore() {
    this.offset += this.limit;
    this.productsService.getProductsByRange(this.limit, this.offset).subscribe({
      next: (data) => {
        this.productsList = [...this.productsList, ...data];
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
