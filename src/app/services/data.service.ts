import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map, Observable} from 'rxjs';
import {ProductModel} from '../models';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataService {
  private httpService = inject(HttpService);

  getProductList(): Observable<ProductModel[]> {
    return this.httpService.getProductList()
      .pipe(
        map(
          ({products}) => products
        )
      );
  }
}
