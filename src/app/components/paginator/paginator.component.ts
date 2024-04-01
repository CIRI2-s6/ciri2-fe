import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ciri2-paginator',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() pageSizes = [10, 25, 50, 100];
  @Input() totalItems: number | undefined = 0;
  @Input() page = 0;

  @Output() paginationChange = new EventEmitter<{
    skip: number;
    pageSize: number;
  }>();

  currentPage = signal<number>(0);
  dropDownOpen = signal<boolean>(false);

  resetPage() {
    this.currentPage.set(0);
  }

  addCurrentPage() {
    this.currentPage.update((value) => value + 1);
    this.emitPageChange();
  }

  subtractCurrentPage() {
    this.currentPage.update((value) => value - 1);
    this.emitPageChange();
  }

  toggleDropDown() {
    this.dropDownOpen.update((value) => !value);
  }

  changePageSize(pageSize: number) {
    this.selectedPageSize = pageSize;
    this.currentPage.set(0);
    this.dropDownOpen.update(() => false);
    this.emitPageChange();
  }

  emitPageChange() {
    this.paginationChange.emit({
      skip: this.currentPage(),
      pageSize: this.selectedPageSize,
    });
  }

  ceilAtMaxItems() {
    if (this.totalItems)
      return Math.min(
        this.selectedPageSize * (this.currentPage() + 1),
        this.totalItems
      );
    return 0;
  }

  atLastPage() {
    if (this.totalItems)
      return (
        this.selectedPageSize * (this.currentPage() + 1) >= this.totalItems
      );
    return false;
  }

  selectedPageSize = 10;
}
