import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.getProducts(this.baseUrl);
  }

  getProductListByCategoryId(categoryId: number): Observable<Product[]> {
    return this.getProducts(this.baseUrl + `/search/findByCategoryId?id=${categoryId}`);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.getProducts(this.baseUrl + `/search/findByNameContaining?name=${keyword}`);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(
        map(response => response._embedded.products)
      )
  }
}


interface GetResponse {
  _embedded: {
    products: Product[]
  }
}