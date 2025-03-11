import {Inject, Injectable} from '@angular/core';
import {ProductModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(String) private key: string) {}

  setData(data: ProductModel[]): void {
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  getData(): ProductModel[] | null {
    const data = window.localStorage.getItem(this.key);
    return data !==null ? JSON.parse(<string>window.localStorage.getItem(this.key)) : null;
  }

  removeData() {
    window.localStorage.removeItem(this.key);
  }
}
