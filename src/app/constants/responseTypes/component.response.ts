import { ComponentModel } from '../componentTypes/component.model';

export interface ComponentResponse {
  status: string;
  message: string;
  data: { components: ComponentModel | ComponentModel[]; total?: number };
}
