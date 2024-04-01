import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent],
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

  it('should reset page', () => {
    component.resetPage();
    expect(component.currentPage()).toBe(0);
  });

  it('should add current page', () => {
    component.addCurrentPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should subtract current page', () => {
    component.subtractCurrentPage();
    expect(component.currentPage()).toBe(-1);
  });

  it('should toggle drop down', () => {
    component.toggleDropDown();
    expect(component.dropDownOpen()).toBe(true);
  });

  it('should change page size', () => {
    const pageSize = 25;
    component.changePageSize(pageSize);
    expect(component.selectedPageSize).toBe(pageSize);
    expect(component.dropDownOpen()).toBe(false);
  });

  it('should emit page change', () => {
    const skip = 0;
    const pageSize = 10;
    const emitMock = jest.fn();
    component.paginationChange.emit = emitMock;
    component.emitPageChange();
    expect(emitMock).toHaveBeenCalledWith({
      skip,
      pageSize,
    });
  });

  it('should ceil at max items', () => {
    component.totalItems = 100;
    const result = component.ceilAtMaxItems();
    expect(result).toBe(10);
  });

  it('should check if at last page', () => {
    component.totalItems = 100;
    component.currentPage.set(10);
    const result = component.atLastPage();
    expect(result).toBe(true);
  });
});
