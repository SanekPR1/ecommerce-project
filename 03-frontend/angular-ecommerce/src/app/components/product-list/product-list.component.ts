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

  public products: Product[] = [];
  public currentCategoryName: string = 'All Categories';
  searchMode: boolean = false;

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
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
      this.productService.getProductListByCategoryId(currentCategoryId)
        .subscribe(
          data => {
            this.products = data;
          });
    } else {
      this.productService.getProductList()
        .subscribe(
          data => {
            this.products = data;
          });
    }
  }

}
