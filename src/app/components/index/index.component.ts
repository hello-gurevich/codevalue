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
  filterString = signal<string>('');
  products = signal<ProductModel[]>([]);
  productsView = computed<ProductModel[]>(
    () => this.sortProducts(this.filterProducts(this.products(), this.filterString()))
  );

  constructor() {
    effect(() => {
      this.storageService.setData(this.productsView());
    });
  }

  ngOnInit() {
    this.initializeProducts();
  }

  onFilterStringChanged(newValue: string): void {
    this.filterString.update(() => newValue);
  }

  onDeleteButtonClick(id: number): void {
    this.deleteProduct(id);
  }

  onSortChanged(sortBy: SortBy): void {
    this.sortBy.update(() => sortBy);
  }

  private filterProducts(products: ProductModel[], sortString: string): ProductModel[] {
    if(sortString.length === 0) {
      return products;
    }

    sortString = sortString.toLowerCase();

    return products.filter(
      x => x.name.toLowerCase().includes(sortString) || x.description?.toLowerCase().includes(sortString)
    );
  }

  private sortProducts(originProducts: ProductModel[]): ProductModel[] {
    return _.sortBy(originProducts, [this.sortBy()]);
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
