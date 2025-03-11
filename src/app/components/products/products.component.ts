import {Component, input, output} from '@angular/core';
import {ProductModel} from '../../models';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = input.required<ProductModel[]>();
  deleteProduct = output<number>();

  onDeleteButtonClick(id: number): void {
    this.deleteProduct.emit(id);
  }

}
