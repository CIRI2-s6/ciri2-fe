import { RequestStatus } from '../../../constants/requestTypes/requestStatus';

export interface DropdownRowColumn {
  dropDownValues: string[];
  defaultOption: string;
  dropdownChange: (value: string) => void;
}

export interface AsyncTextColumn {
  text: string;
  status: RequestStatus;
}
