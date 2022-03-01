import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryName: string = 'All Categories';
  searchMode: boolean = false;
  previousCategoryId: number = -1;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  private handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyword!).subscribe(
      data => {
        this.products = data;
      });
  }

  private handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      let currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      //Check if we have a different category than previous
      //Note: angular will reuse a component if it's currently being viewed
      //if we have a different category id than previous then set pageNumber to 1
      if (currentCategoryId != this.previousCategoryId) {
        this.pageNumber = 1;
        this.setPreviousCategoryId(currentCategoryId);
      }
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
      this.productService.getProductListByCategoryId(this.pageNumber - 1, this.pageSize, currentCategoryId)
        .subscribe(
          data => {
            this.products = data._embedded.products;
            this.pageNumber = data.page.number + 1;
            this.pageSize = data.page.size;
            this.totalElements = data.page.totalElements;
          });
    } else {
      if (-1 != this.previousCategoryId) {
        this.pageNumber = 1;
        this.setPreviousCategoryId(-1);
      }
      this.productService.getProductList()
        .subscribe(
          data => {
            this.products = data;
          });
    }
  }

  private setPreviousCategoryId(currentCategoryId: number) {
    this.previousCategoryId = currentCategoryId;
    console.log(`currentCategoryId = ${currentCategoryId}, pageNumber = ${this.pageNumber}`);

  }

}
