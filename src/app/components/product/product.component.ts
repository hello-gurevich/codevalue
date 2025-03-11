import {Component, inject, Input} from '@angular/core';
import {DataService} from '../../services';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductModel} from '../../models';
import moment from 'moment';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() set id(productId: number) {
    this.setProductDetails(productId);
    this.initProductForm();
  }
  productDetails!: ProductModel;
  productForm!: FormGroup;

  private dataService = inject(DataService);
  private router = inject(Router);

  async onSaveButtonClick(): Promise<void> {
    this.updateProductList();
    await this.navigateToProductPage();
  }

  private async navigateToProductPage(): Promise<void> {
    await this.router.navigate([this.productForm.value.id]);
  }

  private updateProductList(): void {
    const updatedProduct = ProductModel.createFromFlatObject(this.productForm.value);
    this.dataService.updateProductList(updatedProduct);
  }

  private initProductForm(): void {
    this.productForm = new FormGroup({
      id: new FormControl(this.productDetails?.id || this.getNextId(), Validators.required),
      name: new FormControl(this.productDetails?.name, [Validators.required, Validators.max(30)]),
      description: new FormControl(this.productDetails?.description, Validators.max(200)),
      price: new FormControl(this.productDetails?.price, [Validators.required, Validators.min(0)]),
      createdAt: new FormControl(this.productDetails?.createdAt || this.getCurrentDate(), Validators.required),
    });
  }

  private setProductDetails(id: number): void {
    this.productDetails = this.dataService.products()[id];
  }

  private getCurrentDate(): string {
    return moment().format('YYYY-DD-MM HH:mm:ss');
  }

  private getNextId(): number {
    const products = this.dataService.products();
    return products?.map(({id}) => id)?.sort((a, b) => a - b)?.[products.length - 1] + 1;
  }
}
