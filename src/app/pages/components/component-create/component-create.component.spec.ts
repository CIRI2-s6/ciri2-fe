import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ComponentCreateComponent } from './component-create.component';
import { ComponentService } from '../../../service/data-access/component.service';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ComponentResponse } from '../../../constants/responseTypes/component.response';

describe('ComponentCreateComponent', () => {
  let component: ComponentCreateComponent;
  let fixture: ComponentFixture<ComponentCreateComponent>;
  let componentServiceMock: jasmine.SpyObj<ComponentService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    componentServiceMock = jasmine.createSpyObj('ComponentService', [
      'checkComponentExists',
      'batchImportComponents'
    ]);

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ComponentCreateComponent],
      providers: [
        { provide: ComponentService, useValue: componentServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: HttpClient,
          useValue: {
            post: () => {},
            request: () => {}
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should process file correctly', () => {
    // Arrange
    const file = [
      ['name', 'age', 'gender'],
      ['John', '25', 'Male'],
      ['Jane', '30', 'Female']
    ];

    // Act
    component.processFile(file);

    // Assert
    expect(component.processedFile()).toBe(true);
    expect(component.columns()).toEqual(['name', 'age', 'gender']);
    expect(component.type()).toBe(''); // Update with the expected type
    expect(component.components()).toEqual([
      { name: 'John', age: '25', gender: 'Male' },
      { name: 'Jane', age: '30', gender: 'Female' }
    ]);
    expect(component.step()).toBe(1);
  });

  it('should find the correct component type', () => {
    // Arrange
    const columns = [
      'price',
      'core_count',
      'core_clock',
      'boost_clock',
      'tdp',
      'smt',
      'graphics'
    ];

    // Act
    const type = component.findType(columns);

    // Assert
    expect(type).toBe('CPU');
  });

  it('should increment step and call checkComponentExists when nextStep is called', () => {
    // Arrange
    spyOn(component, 'checkComponentExists');
    component.components = signal([{ name: 'John' }, { name: 'Jane' }]);

    // Act
    component.nextStep();
    component.nextStep();

    // Assert
    expect(component.step()).toBe(2);
    expect(component.checkComponentExists).toHaveBeenCalledWith([
      'John',
      'Jane'
    ]);
  });

  it('should increment step and call checkComponentExists when nextStep is called', () => {
    // Arrange
    spyOn(component, 'checkComponentExists');
    component.components = signal([{ name: 'John' }, { name: 'Jane' }]);

    // Act
    component.nextStep();
    component.nextStep();

    // Assert
    expect(component.step()).toBe(2);
    expect(component.checkComponentExists).toHaveBeenCalledWith([
      'John',
      'Jane'
    ]);
  });

  it('should check component existence', () => {
    // Arrange
    const componentNames = ['CPU', 'GPU'];

    componentServiceMock.checkComponentExists.and.returnValue(of(['123']));

    // Act
    component.checkComponentExists(componentNames);

    // Assert
    expect(component['service'].checkComponentExists).toHaveBeenCalledWith(
      componentNames
    );
  });

  it('should import new components and advance to the next step', () => {
    // Arrange
    spyOn(component, 'nextStep');
    componentServiceMock.batchImportComponents.and.returnValue(
      of<ComponentResponse>({
        status: 'success',
        message: 'Components imported successfully',
        data: { components: {} }
      } as ComponentResponse) // Fix: Cast the object to ComponentResponse
    );

    // Act
    component.importNewComponents();

    // Assert
    expect(component.nextStep).toHaveBeenCalledTimes(2);
    expect(component['service'].batchImportComponents).toHaveBeenCalledWith(
      component.processComponents(component.newComponents())
    );
  });

  it('should import all components and advance to the next step', () => {
    // Arrange
    spyOn(component, 'nextStep');
    componentServiceMock.batchImportComponents.and.returnValue(
      of<ComponentResponse>({
        status: 'success',
        message: 'Components imported successfully',
        data: { components: {} }
      } as ComponentResponse) // Fix: Cast the object to ComponentResponse
    );

    // Act
    component.importAllComponents();

    // Assert
    expect(component.nextStep).toHaveBeenCalledTimes(2);
    expect(component['service'].batchImportComponents).toHaveBeenCalledWith(
      component.processComponents(component.newComponents())
    );
  });

  it('should process components correctly', () => {
    // Arrange
    const components = [
      {
        name: 'Component1',
        price: '1',
        core_count: '1',
        core_clock: '1',
        boost_clock: '1',
        tdp: '1',
        smt: '1',
        graphics: '1'
      },
      {
        name: 'Component2',
        price: '2',
        core_count: '2',
        core_clock: '2',
        boost_clock: '2',
        tdp: '2',
        smt: '2',
        graphics: '2'
      }
    ];

    component.type = signal('CPU');

    // Act
    const processedComponents = component.processComponents(components);

    // Assert
    expect(processedComponents).toEqual([
      {
        name: 'Component1',
        type: component.type(),
        properties: {
          price: '1',
          core_count: '1',
          core_clock: '1',
          boost_clock: '1',
          tdp: '1',
          smt: '1',
          graphics: '1'
        }
      },
      {
        name: 'Component2',
        type: component.type(),
        properties: {
          price: '2',
          core_count: '2',
          core_clock: '2',
          boost_clock: '2',
          tdp: '2',
          smt: '2',
          graphics: '2'
        }
      }
    ]);
  });

  it('should navigate to /components when finish is called', () => {
    // Act
    component.finish();

    // Assert
    expect(component['router'].navigate).toHaveBeenCalledWith(['/components']);
  });
});
