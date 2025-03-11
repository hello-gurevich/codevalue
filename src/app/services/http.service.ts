import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ProductModel} from '../models';
import {PRODUCTS} from '../consts';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HttpService {
  private httpClient = inject(HttpClient);

  getProductList(): Observable<{products: ProductModel[] }> {
    return of(PRODUCTS as unknown as {products: ProductModel[] });
  }
}
