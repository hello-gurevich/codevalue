import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpService} from './http.service';
import {map, Observable, tap} from 'rxjs';
import {ProductModel} from '../models';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataService {
  private httpService = inject(HttpService);
  products = signal<ProductModel[]>([]);

  getProductList(): Observable<WritableSignal<ProductModel[]>> {
    return this.httpService.getProductList()
      .pipe(
        tap(
          ({products}) => this.products.update(() => products)
        ),
        map(
          () => this.products
        )
      );
  }

  updateProductList(updatedProduct: ProductModel): void {
    if (this.isNewProduct(updatedProduct)) {
      this.products.update(
        () => ([...this.products(), updatedProduct])
      );
      return;
    }

    this.products.update(
      () => this.products().map(
        product => product.id !== updatedProduct.id ? product : updatedProduct
      )
    );
  }

  private isNewProduct(product: ProductModel): boolean {
    return !this.products().some(x => x.id === product.id);
  }
}
