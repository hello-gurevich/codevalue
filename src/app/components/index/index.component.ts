import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {DataService} from '../../services';
import {ProductModel} from '../../models';
import {Subject, takeUntil} from 'rxjs';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  private destroy$ = new Subject<void>();
  private storageKey = 'products';
  private dataService = inject(DataService);
  private storageService = new StorageService(this.storageKey);

  products = signal<ProductModel[]>([]);

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
