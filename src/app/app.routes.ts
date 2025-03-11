import { Routes } from '@angular/router';
import {IndexComponent} from './components/index/index.component';
import {ProductComponent} from './components/product/product.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: ':id',
        component: ProductComponent,
      }
    ],
  }
];
