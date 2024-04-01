import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { ComponentService } from '../../../service/data-access/component.service';
import {
  ColumnTypes,
  TableColumn,
} from '../../../components/table/models/column.model';
import { ComponentModel } from '../../../constants/componentTypes/component.model';
import { Ciri2ButtonComponent } from '../../../components/buttons/ciri2-button/Ciri2Button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-overview',
  standalone: true,
  imports: [CommonModule, TableComponent, Ciri2ButtonComponent],
  templateUrl: './component-overview.component.html',
  styleUrl: './component-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentOverview {
  constructor(
    private componentService: ComponentService,
    private router: Router
  ) {}

  components = signal<ComponentModel[]>([]);
  totalItems = signal<number>(0);
  itemsAreLoading = signal<boolean>(false);
  type = signal<string>('CPU');
  columns = computed(() => {
    if (!this.components() || !this.components().length) {
      return [];
    }
    return this.componentToColumns(this.components());
  });
  displayComponents = computed(() => {
    console.log(this.components());
    return this.components().map((component) => {
      return {
        ...component,
        ...component.properties,
      };
    });
  });

  ngOnInit() {
    console.log('Component Overview');
    this.itemsAreLoading.set(true);
  }

  componentToColumns(component: ComponentModel[]): TableColumn[] {
    const columns: TableColumn[] = [];
    columns.push({
      name: 'Name',
      key: 'name',
      type: ColumnTypes.TEXT,
    });
    columns.push({
      name: 'Type',
      key: 'type',
      type: ColumnTypes.TEXT,
    });
    const uniqueKeys = new Set<string>();
    this.components().forEach((component) => {
      Object.keys(component.properties).forEach((key) => {
        uniqueKeys.add(key);
      });
    });

    uniqueKeys.forEach((key) => {
      columns.push({
        name: key,
        key: key,
        type: ColumnTypes.TEXT,
      });
    });
    return columns;
  }

  tableChange(pagination: {
    skip: number;
    limit: number;
    filter?: any;
    query?: any;
  }) {
    const paginationData = {
      skip: pagination.skip + 1,
      limit: pagination.limit,
      filter: { type: this.type() },
    };
    this.fetchComponents(paginationData);
  }

  fetchComponents(pagination: { skip: number; limit: number; filter?: any }) {
    this.componentService.getComponents(pagination).subscribe((response) => {
      this.itemsAreLoading.set(false);
      if (!response.data) {
        this.components.set([]);
        return;
      }

      this.components.set(response.data.components as ComponentModel[]);
      if (!response.data.total) {
        this.components.set([]);
        return;
      }
      this.totalItems.set(response.data.total);
    });
  }

  setType(type: Event) {
    this.type.set((type.target as HTMLInputElement).value);
    this.fetchComponents({ skip: 1, limit: 10, filter: { type: this.type() } });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
