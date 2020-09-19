import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
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
  //products: Product[];  
  products$: Observable<Product[]>;
  selectedProduct: Product;
  productsNb$: Observable<number>;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    this.products$ = this
                      .productService
                      .products$
                      .pipe(
                      //  tap(products => this.productsNb = products.length)
                      );

    this.productsNb$ = this
                          .products$
                          .pipe(
                            map(products => products.length),
                            startWith(0)
                          );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

  ngOnDestroy(): void {
  }

}
