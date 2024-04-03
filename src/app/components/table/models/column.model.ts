export interface TableColumn {
  name: string;
  key: string;
  type: ColumnTypes;
}

export enum ColumnTypes {
  SELECT = 'select',
  TEXT = 'text',
  ACTION = 'action',
  DROPDOWN = 'dropdown',
  ASYNCTEXT = 'asyncText'
}
