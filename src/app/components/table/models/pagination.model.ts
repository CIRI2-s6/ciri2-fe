export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export interface TablePagination {
  skip: number;
  limit: number;
  query?: string;
  filter?: Record<string, string>;
  sort?: Record<string, SortDirection>;
}

export interface ActionButton {
  text: string;
  backgroundColor: string;
  color: string;
  click: () => void;
}

export interface RowAction {
  icon: string;
  color: string;
  click: (row: unknown) => void;
}
