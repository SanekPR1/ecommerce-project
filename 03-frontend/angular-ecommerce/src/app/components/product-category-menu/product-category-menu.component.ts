import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories() {
    this.productCategoryService.getProductCategories().subscribe(
      data => {
        console.log(`Product Categories = ${JSON.stringify(data)}`);
        this.productCategories = data;
      }
    )
  }

}
