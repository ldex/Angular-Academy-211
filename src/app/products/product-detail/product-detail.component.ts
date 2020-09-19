import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  product$: Observable<Product>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  delete(id: number): void {
    if(window.confirm('Are you sure ??')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Could not delete product' + error)
      )
    }
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params["id"];
    this.product$ = this
                    .productService
                    .products$
                    .pipe(
                      map(products => products.find(product => product.id === id))
                    )
      // .subscribe(
      //   result => this.product = result
      // )
  }

}
