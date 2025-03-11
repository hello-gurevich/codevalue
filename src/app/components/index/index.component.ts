import {Component, inject, OnInit, signal} from '@angular/core';
import {DataService} from '../../services';
import {ProductModel} from '../../models';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  destroy$ = new Subject<void>();
  private dataService = inject(DataService);
  products = signal<ProductModel[]>([]);

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
