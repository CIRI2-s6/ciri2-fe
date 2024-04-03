import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  signal
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {
  ActionButton,
  RowAction,
  TablePagination
} from './models/pagination.model';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ColumnTypes, TableColumn } from './models/column.model';
import { RequestStatus } from '../../constants/requestTypes/requestStatus';
import { Ciri2ButtonComponent } from '../buttons/ciri2-button/Ciri2Button.component';

@Component({
  selector: 'app-ciri2-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    PaginatorComponent,
    MatIconModule,
    Ciri2ButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any[] = [];
  @Input() totalItems: number | undefined = 0;
  @Input() checkBoxProperty = '';
  @Input() selectionActions: ActionButton[] = [];
  @Input() rowActions: RowAction[] = [];
  @Input() showPaginator = true;
  @Input() showFilter = true;
  @Input() showCheckbox = true;
  @Input() isLoading = false;
  @Input() dropdownEmptyOption = true;

  @Output() paginationChange = new EventEmitter<TablePagination>();
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() rowClick = new EventEmitter<unknown>();

  get columnTypes() {
    return ColumnTypes;
  }

  get requestStatus() {
    return RequestStatus;
  }

  paginationChange$ = new Subject<TablePagination>();

  columnsToDisplay = signal<TableColumn[]>([]);
  displayData = signal<unknown[]>([]);
  tableIndex = signal<number>(0);
  prevFilter = signal<string>('');
  selection = signal<string[]>([]);
  pageSize = signal<number>(10);
  filter = signal<string>('');
  skip = signal<number>(0);

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(PaginatorComponent) paginator: PaginatorComponent | undefined;

  ngOnInit() {
    this.handlePaginationChange();
    this.paginationChange.emit({ skip: 0, limit: 10, query: '' });
    this.displayData.set(this.data);
  }

  ngOnChanges() {
    this.columnsToDisplay.set(this.columns);
    this.displayData.set(this.data);

    if (this.showCheckbox) {
      this.columnsToDisplay.update((columns) => [
        { name: 'select', key: 'select', type: ColumnTypes.SELECT },
        ...columns
      ]);
    }

    if (this.rowActions.length > 0) {
      this.columnsToDisplay.update((columns) => [
        ...columns,
        { name: 'actions', key: 'actions', type: ColumnTypes.ACTION }
      ]);
    }
  }

  handlePaginationChange() {
    this.paginationChange$.subscribe((pagination) => {
      this.paginationChange.emit(pagination);
    });
  }

  resetPage() {
    this.skip.set(0);
    this.paginator?.resetPage();
    this.emitPaginationChange();
  }

  emitPaginationChange() {
    const filter = document.getElementById('input-filter') as HTMLInputElement;
    if (filter.value !== this.prevFilter()) {
      this.skip.set(0);
      this.paginator?.resetPage();
      this.prevFilter.set(filter.value);
    }
    this.paginationChange$.next({
      skip: this.skip() ?? 0,
      limit: this.pageSize() ?? 10,
      query: filter.value
    });
  }

  paginatorChange(pagination: { skip: number; pageSize: number }) {
    this.skip.set(pagination.skip);
    this.pageSize.set(pagination.pageSize);
    this.emitPaginationChange();
  }

  isAllSelected() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.data.every((row: any) =>
      this.selection().includes(row[this.checkBoxProperty])
    );
  }

  deselectAll() {
    this.selection.set([]);
  }

  onRowClick(row: unknown) {
    this.rowClick.emit(row);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkCheckbox(row?: any) {
    this.selection.update((value: string[]) => {
      if (value.includes(row[this.checkBoxProperty])) {
        return value.filter((item) => item !== row[this.checkBoxProperty]);
      }
      return [...value, row[this.checkBoxProperty]];
    });
    this.selectionChange.emit(this.selection());
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.update((value: string[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSelection = this.data.map((row: any) => {
          return row[this.checkBoxProperty];
        });
        return value.filter((item) => !newSelection.includes(item));
      });
    } else {
      this.selection.update((value: string[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSelection = this.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((row: any) => !value.includes(row[this.checkBoxProperty]))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((row: any) => row[this.checkBoxProperty]);
        return [...value, ...newSelection];
      });
    }
    this.selectionChange.emit(this.selection());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isSelected(row: any) {
    return this.selection().includes(row[this.checkBoxProperty]);
  }

  getRows() {
    return this.columnsToDisplay().map((column) => column.key);
  }
}
