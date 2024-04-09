import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ComponentOverviewComponent } from './component-overview.component';
import { ComponentService } from '../../../service/data-access/component.service';
import { of } from 'rxjs';
import { ComponentModel } from '../../../constants/componentTypes/component.model';
import { ComponentResponse } from '../../../constants/responseTypes/component.response';
import { signal } from '@angular/core';
import { ColumnTypes } from '../../../components/table/models/column.model';

describe('ComponentOverviewComponent', () => {
  let component: ComponentOverviewComponent;
  let fixture: ComponentFixture<ComponentOverviewComponent>;
  let componentServiceMock: jasmine.SpyObj<ComponentService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    componentServiceMock = jasmine.createSpyObj('ComponentService', [
      'getComponents'
    ]);
    componentServiceMock.getComponents.and.returnValue(
      of({ data: { components: [], total: 0 }, status: '', message: '' })
    );

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ComponentOverviewComponent],
      providers: [
        { provide: ComponentService, useValue: componentServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch components and set the total items', () => {
    // Arrange
    const paginationData = { skip: 0, limit: 10, filter: { type: 'CPU' } };
    const response: ComponentResponse = {
      data: {
        components: [
          { name: 'Component1', type: 'CPU', properties: {} },
          { name: 'Component2', type: 'CPU', properties: {} }
        ] as ComponentModel[],
        total: 2
      },
      status: '',
      message: ''
    };
    componentServiceMock.getComponents.and.returnValue(of(response));

    // Act
    component.fetchComponents(paginationData);

    // Assert
    expect(component.itemsAreLoading()).toBe(false);
    expect(component.components()).toEqual([
      { name: 'Component1', type: 'CPU', properties: {} },
      { name: 'Component2', type: 'CPU', properties: {} }
    ]);
    expect(component.totalItems()).toBe(2);
  });

  it('should set the type and fetch components when setType is called', () => {
    // Arrange
    const event = { target: { value: 'GPU' } };
    componentServiceMock.getComponents.and.returnValue(
      of({ data: { components: [], total: 0 }, status: '', message: '' })
    );

    // Act
    component.setType(event as unknown as Event);

    // Assert
    expect(component.type()).toBe('GPU');
  });

  it('should navigate to the specified route', () => {
    // Arrange
    const route = '/components';

    // Act
    component.navigate(route);

    // Assert
    expect(routerMock.navigate).toHaveBeenCalledWith([route]);
  });

  it('should fetch components with updated pagination data', () => {
    // Arrange
    const pagination = {
      skip: 0,
      limit: 10,
      filter: { type: 'CPU' },
      query: {}
    };
    const paginationData = {
      skip: pagination.skip + 1,
      limit: pagination.limit,
      filter: { type: 'CPU' }
    };
    componentServiceMock.getComponents.and.returnValue(
      of({ data: { components: [], total: 0 }, status: '', message: '' })
    );

    spyOn(component, 'fetchComponents');

    // Act
    component.tableChange(pagination);

    // Assert
    expect(component.fetchComponents).toHaveBeenCalledWith(paginationData);
  });

  it('should return the correct columns', () => {
    // Arrange
    const component1: ComponentModel = {
      name: 'Component1',
      type: 'CPU',
      properties: {
        property1: 'Value1',
        property2: 'Value2'
      }
    };
    const component2: ComponentModel = {
      name: 'Component2',
      type: 'GPU',
      properties: {
        property3: 'Value3',
        property4: 'Value4'
      }
    };
    component.components = signal([component1, component2]);
    // Act
    const result = component.componentToColumns();

    // Assert
    expect(result.length).toBe(6);
    expect(result[0]).toEqual({
      name: 'Name',
      key: 'name',
      type: ColumnTypes.TEXT
    });
    expect(result[1]).toEqual({
      name: 'Type',
      key: 'type',
      type: ColumnTypes.TEXT
    });
    expect(result[2]).toEqual({
      name: 'property1',
      key: 'property1',
      type: ColumnTypes.TEXT
    });
    expect(result[3]).toEqual({
      name: 'property2',
      key: 'property2',
      type: ColumnTypes.TEXT
    });
  });
});
