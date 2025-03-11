import {Component, input, output} from '@angular/core';
import {SortBy} from "../../enums";

@Component({
  selector: 'app-sort',
  imports: [],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
  sortBy = input.required<SortBy>();
  sortChanged = output<SortBy>();
  SortByEnum = SortBy;

  onSortChanged(event: Event): void {
    this.sortChanged.emit((event.target as any).value);
  }
}
