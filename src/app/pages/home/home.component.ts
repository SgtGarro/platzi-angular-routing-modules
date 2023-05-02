import { Component, OnInit } from '@angular/core';
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

  constructor(private productsService: ProductsService) {
    this.productsList = [];
    this.limit = 10;
    this.offset = 0;
  }

  ngOnInit(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.productsList = data;
        this.offset += this.limit;
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
