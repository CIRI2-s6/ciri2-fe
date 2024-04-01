import { RequestStatus } from 'apps/admin/admin-fe/src/data-access/requestStatus';

export interface DropdownRowColumn {
  dropDownValues: string[];
  defaultOption: string;
  dropdownChange: (value: string) => void;
}

export interface AsyncTextColumn {
  text: string;
  status: RequestStatus;
}
