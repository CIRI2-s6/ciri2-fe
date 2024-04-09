import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatIconModule, PaginatorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the current page to 0', () => {
    // Arrange
    component.currentPage.set(5);

    // Act
    component.resetPage();

    // Assert
    expect(component.currentPage()).toBe(0);
  });

  it('should increment the current page by 1 and emit page change', () => {
    // Arrange
    spyOn(component.paginationChange, 'emit');

    // Act
    component.addCurrentPage();

    // Assert
    expect(component.currentPage()).toBe(1);
    expect(component.paginationChange.emit).toHaveBeenCalled();
  });

  it('should decrement the current page by 1 and emit page change', () => {
    // Arrange
    spyOn(component.paginationChange, 'emit');

    // Act
    component.subtractCurrentPage();

    // Assert
    expect(component.currentPage()).toBe(-1);
    expect(component.paginationChange.emit).toHaveBeenCalled();
  });

  it('should toggle the drop down open state', () => {
    // Arrange
    component.dropDownOpen.set(true);

    // Act
    component.toggleDropDown();

    // Assert
    expect(component.dropDownOpen()).toBe(false);
  });

  it('should change the page size and emit page change', () => {
    // Arrange
    spyOn(component.paginationChange, 'emit');

    // Act
    component.changePageSize(25);

    // Assert
    expect(component.selectedPageSize).toBe(25);
    expect(component.currentPage()).toBe(0);
    expect(component.dropDownOpen()).toBe(false);
    expect(component.paginationChange.emit).toHaveBeenCalled();
  });

  it('should emit page change with correct skip and page size values', () => {
    // Arrange
    spyOn(component.paginationChange, 'emit');
    component.currentPage.set(2);
    component.selectedPageSize = 50;

    // Act
    component.emitPageChange();

    // Assert
    expect(component.paginationChange.emit).toHaveBeenCalledWith({
      skip: 2,
      pageSize: 50
    });
  });

  it('should return the correct value when ceilAtMaxItems is called', () => {
    // Arrange
    component.currentPage.set(1);
    component.selectedPageSize = 10;
    component.totalItems = 25;

    // Act
    const result = component.ceilAtMaxItems();

    // Assert
    expect(result).toBe(20);
  });

  it('should return false when atLastPage is called and totalItems is not set', () => {
    // Act
    const result = component.atLastPage();

    // Assert
    expect(result).toBe(false);
  });

  it('should return true when atLastPage is called and current page is at last page', () => {
    // Arrange
    component.currentPage.set(2);
    component.selectedPageSize = 10;
    component.totalItems = 25;

    // Act
    const result = component.atLastPage();

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when atLastPage is called and current page is not at last page', () => {
    // Arrange
    component.currentPage.set(1);
    component.selectedPageSize = 10;
    component.totalItems = 25;

    // Act
    const result = component.atLastPage();

    // Assert
    expect(result).toBe(false);
  });
});
