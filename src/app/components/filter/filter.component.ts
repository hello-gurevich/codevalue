import {Component, DestroyRef, inject, input, OnInit, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, Subscription} from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  private subscription$!: Subscription;
  private destroyRef = inject(DestroyRef);
  filterString = input.required<string>();
  filterStringChanged = output<string>();
  filterControl!: FormControl;

  constructor() {
    this.destroyRef.onDestroy(() => this.subscription$ && this.subscription$.unsubscribe())
  }

  ngOnInit() {
    this.initializeFilterControl();
    this.trackFilterControl();
  }

  private initializeFilterControl(): void {
    this.filterControl = new FormControl(this.filterString());
  }

  private trackFilterControl(): void {
    this.subscription$ = this.filterControl.valueChanges
      .pipe(
        debounceTime(200),
      )
      .subscribe(
        val => this.filterStringChanged.emit(val)
      );
  }

}
