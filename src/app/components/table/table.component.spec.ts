import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ColumnTypes } from './models/column.model';
import { Ciri2ButtonComponent } from '../buttons/ciri2-button/Ciri2Button.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatIconModule,
        TableComponent,
        Ciri2ButtonComponent,
        PaginatorComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.checkBoxProperty = 'id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pagination change event on handlePaginationChange', () => {
    // Arrange
    const pagination = { skip: 0, limit: 10, query: '' };
    spyOn(component.paginationChange, 'emit');

    // Act
    component.handlePaginationChange();
    component.paginationChange$.next(pagination);

    // Assert
    expect(component.paginationChange.emit).toHaveBeenCalledWith(pagination);
  });

  it('should reset page and emit pagination change event on resetPage', () => {
    // Arrange
    spyOn(component.skip, 'set');
    spyOn(component, 'emitPaginationChange');

    // Act
    component.resetPage();

    // Assert
    expect(component.skip.set).toHaveBeenCalledWith(0);
    expect(component.emitPaginationChange).toHaveBeenCalled();
  });

  it('should emit pagination change event on paginatorChange', () => {
    // Arrange
    const pagination = { skip: 0, pageSize: 10 };
    spyOn(component.skip, 'set');
    spyOn(component.pageSize, 'set');
    spyOn(component, 'emitPaginationChange');

    // Act
    component.paginatorChange(pagination);

    // Assert
    expect(component.skip.set).toHaveBeenCalledWith(pagination.skip);
    expect(component.pageSize.set).toHaveBeenCalledWith(pagination.pageSize);
    expect(component.emitPaginationChange).toHaveBeenCalled();
  });

  it('should return true if all rows are selected', () => {
    // Arrange
    component.data = [
      { id: '1', name: 'Row 1' },
      { id: '2', name: 'Row 2' },
      { id: '3', name: 'Row 3' }
    ];
    component.selection.set(['1', '2', '3']);

    // Act
    const result = component.isAllSelected();

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if not all rows are selected', () => {
    // Arrange
    component.data = [
      { id: '1', name: 'Row 1' },
      { id: '2', name: 'Row 2' },
      { id: '3', name: 'Row 3' }
    ];
    component.selection.set(['1', '2']);

    // Act
    const result = component.isAllSelected();

    // Assert
    expect(result).toBe(false);
  });

  it('should deselect all rows', () => {
    // Arrange
    component.selection.set(['1', '2', '3']);

    // Act
    component.deselectAll();

    // Assert
    expect(component.selection()).toEqual([]);
  });

  it('should update selection and emit selection change event on checkCheckbox', () => {
    // Arrange
    const row = { id: '1', name: 'Row 1' };
    component.selection.set(['2', '3']);
    spyOn(component.selectionChange, 'emit');

    // Act
    component.checkCheckbox(row);

    // Assert
    expect(component.selection()).toEqual(['2', '3', '1']);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      component.selection()
    );
  });

  it('should update selection and emit selection change event on toggleAllRows', () => {
    // Arrange
    component.data = [
      { id: '1', name: 'Row 1' },
      { id: '2', name: 'Row 2' },
      { id: '3', name: 'Row 3' }
    ];
    component.selection.set(['2', '3']);
    spyOn(component.selectionChange, 'emit');

    // Act
    component.toggleAllRows();

    console.log(component.selection());

    // Assert
    expect(component.selection()).toEqual(['2', '3', '1']);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      component.selection()
    );
  });

  it('should return true if row is selected', () => {
    // Arrange
    const row = { id: '1', name: 'Row 1' };
    component.selection.set(['1', '2', '3']);

    // Act
    const result = component.isSelected(row);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if row is not selected', () => {
    // Arrange
    const row = { id: '1', name: 'Row 1' };
    component.selection.set(['2', '3']);

    // Act
    const result = component.isSelected(row);

    // Assert
    expect(result).toBe(false);
  });

  it('should return an array of column keys on getRows', () => {
    // Arrange
    component.columnsToDisplay.set([
      { name: 'ID', key: 'id', type: ColumnTypes.TEXT },
      { name: 'Name', key: 'name', type: ColumnTypes.TEXT }
    ]);

    // Act
    const result = component.getRows();

    // Assert
    expect(result).toEqual(['id', 'name']);
  });
});
