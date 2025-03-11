import {Component, input, output} from '@angular/core';
import {ProductModel} from '../../models';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = input.required<ProductModel[]>();
  deleteProduct = output<number>();
  editProduct = output<number>();

  onDeleteButtonClick(id: number): void {
    this.deleteProduct.emit(id);
  }

}
