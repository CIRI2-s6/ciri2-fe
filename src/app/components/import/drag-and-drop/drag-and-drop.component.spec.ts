import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragAndDropComponent } from './drag-and-drop.component';

describe('DragAndDropComponent', () => {
  let component: DragAndDropComponent;
  let fixture: ComponentFixture<DragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDropComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should handle file change and emit parsed file', () => {
    // Arrange
    const fileContent = 'column1,column2,column3\nvalue1,value2,value3\n';
    const file = new File([fileContent], 'test.csv', { type: 'text/csv' });
    const fileInput = {
      target: {
        files: [file]
      }
    };
    const expectedParsedData = [['value1', 'value2', 'value3']];

    // Act
    component.handleFileChange();
    component.parsedFile.subscribe((parsedData) => {
      // Assert
      expect(parsedData).toEqual(expectedParsedData);
    });
    component.fileChanged$.next(fileInput as unknown as Event);

    // Cleanup
    component.destroy$.next();
    component.destroy$.complete();
  });

  it('should transform parsed data by removing columns with square brackets', () => {
    // Arrange
    const inputData = [
      ['column1', 'column2', 'column3'],
      ['value1', 'value2', 'value3'],
      ['[value4]', '[value5]', '[value6]']
    ];
    const expectedTransformedData = [
      ['column1', 'column2', 'column3'],
      ['value1', 'value2', 'value3'],
      ['[value4]', '[value5]', '[value6]']
    ];

    // Act
    const transformedData = component.transformParsedData(inputData);

    // Assert
    expect(transformedData).toEqual(expectedTransformedData);
  });
});
