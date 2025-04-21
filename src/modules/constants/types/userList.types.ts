import {
  ColumnOption,
  CustomColumnRender,
} from 'ddc-ui-typescript/dist/components/Table/Table.types';

export interface UserFilterParams {
  username?: string;
  phone?: string;
  department?: string | null;
  role?: string | null;
  limit?: number;
  skip?: number;
}

export interface TableColumn<T> {
  label: string;
  field: keyof T;
  options?: ColumnOption;
  customRender?: CustomColumnRender<T>;
}
