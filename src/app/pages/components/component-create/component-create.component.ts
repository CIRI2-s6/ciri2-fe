/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { DragAndDropComponent } from '../../../components/import/drag-and-drop/drag-and-drop.component';
import { componentTypes } from '../../../constants/componentTypes/component.properties';
import { ColumnTypes } from '../../../components/table/models/column.model';
import { TableComponent } from '../../../components/table/table.component';
import { Ciri2ButtonComponent } from '../../../components/buttons/ciri2-button/Ciri2Button.component';
import { ComponentService } from '../../../service/data-access/component.service';
import { StepperComponent } from '../../../components/stepper/stepper.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-create',
  standalone: true,
  imports: [
    CommonModule,
    DragAndDropComponent,
    TableComponent,
    Ciri2ButtonComponent,
    StepperComponent
  ],
  templateUrl: './component-create.component.html',
  styleUrl: './component-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentCreateComponent {
  constructor(
    private service: ComponentService,
    private router: Router
  ) {}

  step = signal<number>(0);
  processedFile = signal<boolean>(false);
  columns = signal<string[]>([]);
  type = signal<string>('');
  viewColumns = computed(() => {
    return this.columns().map((column) => {
      return {
        name: column,
        key: column,
        type: ColumnTypes.TEXT
      };
    });
  });
  components = signal<unknown[]>([]);
  duplicateComponents = signal<string[]>([]);
  newComponents = computed(() => {
    return this.components().filter(
      (component: any) => !this.duplicateComponents().includes(component.name)
    );
  });

  processFile(file: any) {
    const columns = file[0];
    const data = file.slice(1);

    // Find the type of the component
    const type = this.findType(columns);

    const objects = data.map((row: string[]) => {
      const obj: any = {};
      columns.forEach((column: string, index: number) => {
        obj[column] = row[index];
      });
      return obj;
    });

    const duplicationsAdded: any[] = [];

    const filteredObjects = objects.filter((obj: any) => {
      if (obj.name === null || obj.name.length === 0) {
        return false;
      }
      if (duplicationsAdded.includes(obj.name)) {
        return false;
      }
      duplicationsAdded.push(obj.name);
      return true;
    });

    this.processedFile.set(true);
    this.columns.set(columns);
    this.type.set(type);
    this.components.set(filteredObjects);
    this.step.set(1);
  }

  findType(columns: string[]): string {
    for (const component of componentTypes) {
      if (component.properties.every((prop) => columns.includes(prop))) {
        return component.type;
      }
    }
    return '';
  }

  nextStep() {
    this.step.update((step) => step + 1);
    if (this.step() === 2) {
      this.checkComponentExists(
        this.components().map((component: any) => component.name)
      );
    }
  }

  checkComponentExists(componentNames: string[]): void {
    this.service
      .checkComponentExists(componentNames)
      .subscribe((response: any) => {
        this.duplicateComponents.set(response.data.data);
      });
  }

  importNewComponents() {
    this.nextStep();
    this.service
      .batchImportComponents(this.processComponents(this.newComponents()))
      .subscribe(() => {
        this.nextStep();
      });
  }

  importAllComponents() {
    console.log('Importing all components');
    this.nextStep();
    this.service
      .batchImportComponents(this.processComponents(this.components()))
      .subscribe(() => {
        this.nextStep();
      });
  }

  processComponents(components: any[]) {
    return components
      .map((component: any) => {
        if (!component.name) {
          return null;
        }

        const componentType = componentTypes.find(
          (type) => type.type === this.type()
        );
        const properties = componentType ? componentType.properties : [];

        return {
          name: component.name,
          type: this.type(),
          properties: properties.reduce((acc: any, property: any) => {
            acc[property] = component[property];
            return acc;
          }, {})
        };
      })
      .filter((component) => component !== null) as any[];
  }

  finish() {
    this.router.navigate(['/components']);
  }
}
