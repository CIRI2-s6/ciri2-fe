export interface ComponentModel {
  id?: string;
  name: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any;
}
