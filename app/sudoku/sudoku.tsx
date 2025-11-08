import React, { useState, useCallback } from "react";
import type { Board, Cell } from "./types";

// --- Tipos de Componentes ---

interface SudokuBoardProps {
  board: Board;
  onCellChange: (row: number, col: number, value: number | null) => void;
}

interface SudokuCellProps {
  cell: Cell;
  onValueChange: (value: number | null) => void;
  onClick: () => void;
  isSelected: boolean;
}

// --- Componente Celda ---

const SudokuCell: React.FC<SudokuCellProps> = ({
  cell,
  onValueChange,
  onClick,
  isSelected,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    let newValue: number | null = null;
    if (input === "" || input === "0") {
      newValue = null;
    } else {
      const num = parseInt(input, 10);
      if (num >= 1 && num <= 9) {
        newValue = num;
      }
    }
    onValueChange(newValue);
  };

  const baseClasses =
    "w-full h-10 sm:h-12 md:h-14 text-center text-lg sm:text-xl font-semibold border-none outline-none transition-colors duration-100";
  const initialClasses = cell.isInitial
    ? "bg-gray-200 text-gray-800"
    : "bg-white text-blue-600 cursor-text hover:bg-blue-50 focus:bg-blue-100";
  const errorClasses = cell.isError ? "bg-red-300 text-red-800" : "";
  const selectedClasses = isSelected
    ? "ring-2 ring-offset-1 ring-yellow-500 z-10"
    : "";

  return (
    <input
      type="text"
      className={`${baseClasses} ${initialClasses} ${errorClasses} ${selectedClasses}`}
      value={cell.value !== null ? String(cell.value) : ""}
      onChange={cell.isInitial ? undefined : handleChange}
      onClick={onClick}
      readOnly={cell.isInitial}
      maxLength={1}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    />
  );
};

// --- Componente Principal del Tablero ---

export const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  onCellChange,
}) => {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, []);

  const handleCellChange = useCallback(
    (row: number, col: number, value: number | null) => {
      onCellChange(row, col, value);
      setSelectedCell({ row, col });
    },
    [onCellChange],
  );

  return (
    <div className="flex flex-col border-4 border-gray-800 shadow-2xl max-w-lg mx-auto bg-gray-300">
      {board.map((rowArr, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex ${rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-4 border-gray-800" : "border-b border-gray-400"}`}
        >
          {rowArr.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`flex-grow w-1/9 ${colIndex % 3 === 2 && colIndex !== 8 ? "border-r-4 border-gray-800" : "border-r border-gray-400"}`}
              style={{ flexBasis: "11.1111%" }}
            >
              <SudokuCell
                cell={cell}
                onValueChange={(value) =>
                  handleCellChange(rowIndex, colIndex, value)
                }
                onClick={() => handleCellClick(rowIndex, colIndex)}
                isSelected={
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
