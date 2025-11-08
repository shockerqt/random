export type Cell = {
  value: number | null;
  isInitial: boolean;
  isError: boolean;
};

export type Board = Cell[][];
