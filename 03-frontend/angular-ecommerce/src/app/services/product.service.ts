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

  getProductList(pageNumber: number,
    pageSize: number): Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(this.baseUrl + `?page=${pageNumber}&size=${pageSize}`);
  }

  getProductListByCategoryId(pageNumber: number,
    pageSize: number,
    categoryId: number): Observable<GetResponse> {
    return this.httpClient.get<GetResponse>(this.baseUrl + `/search/findByCategoryId?id=${categoryId}` +
      `&page=${pageNumber}&size=${pageSize}`);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.getProducts(this.baseUrl + `/search/findByNameContaining?name=${keyword}`);
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${productId}`)
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
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}