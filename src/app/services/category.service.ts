import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API_URL}/api/categories`;
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.API_URL);
  }
}
