import {Component, inject, Input, OnInit} from '@angular/core';
import {DataService} from '../../services';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductModel} from '../../models';
import moment from 'moment';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-product',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  @Input() set id(productId: number) {
    this.setProductDetails(productId);
    this.initProductForm();
  }

  private dataService = inject(DataService);
  productForm!: FormGroup;
  productDetails!: ProductModel;

  ngOnInit() {}

  private initProductForm(): void {
    this.productForm = new FormGroup({
      id: new FormControl(this.productDetails?.id || this.getNextId(), Validators.required),
      name: new FormControl(this.productDetails?.name, Validators.required),
      description: new FormControl(this.productDetails?.description),
      price: new FormControl(this.productDetails?.price, Validators.required),
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
