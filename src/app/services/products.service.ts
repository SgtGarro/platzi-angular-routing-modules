import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../model/product.model';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API_URL}/api`;
  }
  public getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.API_URL}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((product) => {
            return {
              ...product,
              taxes: product.price * 0.19,
            };
          })
        )
      );
  }

  public getProductsByCategory(
    categoryId: string,
    limit: number,
    offset: number
  ) {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http.get<Product[]>(
      `${this.API_URL}/categories/${categoryId}/products`,
      {
        params,
        context: checkTime(),
      }
    );
  }

  public getProduct(id: string | number) {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`).pipe(
      retry(3),
      catchError((response: HttpErrorResponse) => {
        if (response.status === HttpStatusCode.Conflict)
          return throwError(
            () => new Error('Ups, the server is having difficult')
          );
        if (response.status === HttpStatusCode.NotFound)
          return throwError(() => new Error('Product not found'));
        if (response.status === HttpStatusCode.Unauthorized)
          return throwError(() => new Error('Not authorized'));

        return throwError(() => new Error('Ups, algo salio mal'));
      })
    );
  }

  public getProductsByRange(limit: number, offset: number) {
    return this.http
      .get<Product[]>(`${this.API_URL}/products`, {
        params: { limit, offset },
      })
      .pipe(retry(3));
  }

  public createProduct(product: CreateProductDTO) {
    return this.http.post<Product>(`${this.API_URL}/products`, product);
  }

  public updateProduct(id: string | number, product: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, product);
  }

  public deleteProduct(id: string | number) {
    return this.http.delete<boolean>(`${this.API_URL}/products/${id}`);
  }

  public fetchReadAndUpdate(id: string | number, product: UpdateProductDTO) {
    return zip(this.getProduct(id), this.updateProduct(id, product));
  }
}
