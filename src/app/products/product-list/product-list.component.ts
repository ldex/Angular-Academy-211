import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductListComponent implements OnInit, OnDestroy {

  title: string = 'Products';
  products: Product[];  
  selectedProduct: Product;

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(private productService: ProductService) { 
    
  }

  ngOnInit(): void {
    this
      .productService
      .products$
      .subscribe(
        results => this.products = results
      );
  }

  ngOnDestroy(): void {
  }

}
