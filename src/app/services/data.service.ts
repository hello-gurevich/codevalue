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
}
