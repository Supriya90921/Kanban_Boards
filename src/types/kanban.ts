export interface Card {
  id: string;
  title: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  count: number;
  color: string;
}

export type ColumnId = 'todo' | 'inProgress' | 'done';
