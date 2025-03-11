import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {DataService} from '../../services';
import {ProductModel} from '../../models';
import {Subject, takeUntil} from 'rxjs';
import {StorageService} from '../../services/storage.service';
import {ProductsComponent} from '../products/products.component';
import {FilterComponent} from '../filter/filter.component';
import {SortBy} from '../../enums';
import * as _ from 'lodash';
import {SortComponent} from '../sort/sort.component';

@Component({
  selector: 'app-index',
  imports: [
    ProductsComponent,
    FilterComponent,
    SortComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  private destroy$ = new Subject<void>();
  private storageKey = 'products';
  private dataService = inject(DataService);
  private storageService = new StorageService(this.storageKey);
  SortByEnum = SortBy;

  sortBy = signal<SortBy>(this.SortByEnum.ByName);
  products = signal<ProductModel[]>([]);
  productsView = computed<ProductModel[]>(
    () => _.sortBy(this.products(), [this.sortBy()])
  );

  constructor() {
    effect(() => {
      this.storageService.setData(this.products());
    });
  }

  ngOnInit() {
    this.initializeProducts();
  }

  onDeleteButtonClick(id: number): void {
    this.deleteProduct(id);
  }

  onSortChanged(sortBy: SortBy): void {
    this.sortBy.update(() => sortBy);
  }

  private deleteProduct(productId: number): void {
    this.products.update(
      () => this.products().filter(({id}) => id !== productId),
    );
  }

  private initializeProducts(): void {
    this.dataService.getProductList()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        products => this.products.update(() => products)
      );
  }

}
