import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public myShoppingCart: Product[];

  @Input() public productsList: Product[];
  @Output() public loadMore = new EventEmitter<void>();

  public total: number;
  public todayDate: Date;
  public anotherDate: Date;
  public showProductsDetail: boolean;
  public productChosen!: Product;

  public statusDetail: 'success' | 'error' | 'loading' | 'init';

  constructor(
    private productsService: ProductsService,
    private storeService: StoreService
  ) {
    this.myShoppingCart = storeService.getShoppingCart();

    this.productsList = [];
    this.total = 0;
    this.todayDate = new Date();
    this.anotherDate = new Date(2021, 2, 24);
    this.showProductsDetail = false;

    this.statusDetail = 'init';
  }

  public onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  public toggleProductDetail() {
    this.showProductsDetail = !this.showProductsDetail;
  }

  public onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe({
      next: (data) => {
        this.statusDetail = 'success';
        this.productChosen = data;
        this.toggleProductDetail();
      },
      error: (err) => {
        this.statusDetail = 'error';
        alert(err);
      },
    });
  }

  public createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New product',
      description: 'bla bla bla',
      images: [''],
      price: 130,
      categoryId: 1,
    };

    this.productsService.createProduct(product).subscribe((data) => {
      console.log(data);
      this.productsList.unshift(data);
    });
  }

  public readAndUpdateProduct(id: string) {
    this.productsService
      .fetchReadAndUpdate(id, { title: 'changed' })
      .subscribe({
        next: (response) => {
          const [read, update] = response;
        },
      });
    /* this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.updateProduct(product.id, {
            title: 'changed',
          })
        )
      )
      .subscribe({
        next: (product) => console.log(product),
      }); */
  }

  public updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Other new product',
    };
    const id = this.productChosen.id;

    this.productsService.updateProduct(id, changes).subscribe((data) => {
      const index = this.productsList.findIndex(
        (product) => product.id === this.productChosen.id
      );
      this.productsList[index] = data;
      this.productChosen = data;
      console.log(this.productsList);
    });
  }

  public deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe(() => {
      const index = this.productsList.findIndex(
        (product) => product.id === this.productChosen.id
      );
      this.productsList.splice(index, 1);
      this.toggleProductDetail();
    });
  }

  public onLoadMore() {
    this.loadMore.emit();
  }

  public logProductsList() {
    console.log(this.productsList);
  }
}
