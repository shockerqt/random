import type { Route } from "./+types/home";
import { useState } from "react";
import { SudokuBoard } from "~/sudoku/sudoku";
import type { Board } from "~/sudoku/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mona" },
    { name: "description", content: "Una mona bailando" },
  ];
}

export default function Sudoku() {
  return (
    <main className="grid size-full place-items-center h-dvh">
      <Game />
    </main>
  );
}

const generateInitialPuzzle = (): Board => {
  const emptyBoard: Board = Array(9)
    .fill(null)
    .map(() =>
      Array(9)
        .fill(null)
        .map(() => ({
          value: null,
          isInitial: false,
          isError: false,
        })),
    );

  // Puzzle inicial (ejemplo simplificado)
  const initialValues = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (initialValues[r][c] !== 0) {
        emptyBoard[r][c] = {
          value: initialValues[r][c],
          isInitial: true,
          isError: false,
        };
      }
    }
  }

  return emptyBoard;
};

// Función de validación (completa)
const validateAndMarkErrors = (currentBoard: Board): Board => {
  // Crear una copia limpia para trabajar y aplicar errores
  const newBoard = currentBoard.map((rowArr) =>
    rowArr.map((cell) => ({ ...cell, isError: false })),
  );

  const checkDuplicates = (values: (number | null)[]) => {
    const present = new Set<number>();
    const duplicates = new Set<number>();
    values
      .filter((v) => v !== null)
      .forEach((v) => {
        if (present.has(v!)) {
          duplicates.add(v!);
        }
        present.add(v!);
      });
    return duplicates;
  };

  const getSubgridIndices = (r: number, c: number) => {
    const startRow = Math.floor(r / 3) * 3;
    const startCol = Math.floor(c / 3) * 3;
    const indices: { r: number; c: number }[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        indices.push({ r: startRow + i, c: startCol + j });
      }
    }
    return indices;
  };

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = newBoard[r][c];
      if (cell.value === null) continue;

      // 1. Validar Fila
      const rowValues = newBoard[r].map((cell) => cell.value);
      const rowDuplicates = checkDuplicates(rowValues);

      // 2. Validar Columna
      const colValues = newBoard.map((row) => row[c].value);
      const colDuplicates = checkDuplicates(colValues);

      // 3. Validar Bloque 3x3
      const subgridIndices = getSubgridIndices(r, c);
      const subgridValues = subgridIndices.map(
        (idx) => newBoard[idx.r][idx.c].value,
      );
      const subgridDuplicates = checkDuplicates(subgridValues);

      // Marcar error si el valor actual es un duplicado en cualquiera de los tres
      if (
        rowDuplicates.has(cell.value) ||
        colDuplicates.has(cell.value) ||
        subgridDuplicates.has(cell.value)
      ) {
        newBoard[r][c].isError = true;
      }
    }
  }

  return newBoard;
};

const isBoardComplete = (currentBoard: Board): boolean => {
  return currentBoard.every((row) =>
    row.every((cell) => cell.value !== null && !cell.isError),
  );
};

// --- Componente Principal del Juego ---

export const Game: React.FC = () => {
  const [board, setBoard] = useState<Board>(() =>
    validateAndMarkErrors(generateInitialPuzzle()),
  );
  const [message, setMessage] = useState<string>(
    "¡A jugar! Ingresa números del 1 al 9.",
  );

  const handleCellUpdate = (row: number, col: number, value: number | null) => {
    // 1. Aplicar el cambio de valor en una copia del estado
    let newBoard = board.map((rowArr) => rowArr.map((cell) => ({ ...cell })));
    if (!newBoard[row][col].isInitial) {
      newBoard[row][col].value = value;
    }

    // 2. Re-validar todo el tablero para marcar errores
    newBoard = validateAndMarkErrors(newBoard);

    // 3. Actualizar el estado
    setBoard(newBoard);

    // 4. Comprobar estado del juego
    const hasErrors = newBoard.flat().some((cell) => cell.isError);
    const isComplete = isBoardComplete(newBoard);

    if (hasErrors) {
      setMessage("Hay números duplicados. Revisa las celdas marcadas en rojo.");
    } else if (isComplete) {
      setMessage("¡Felicidades! 🎉 Has resuelto el Sudoku.");
    } else {
      setMessage("Sigue jugando...");
    }
  };

  const handleNewGame = () => {
    setBoard(validateAndMarkErrors(generateInitialPuzzle()));
    setMessage("¡A jugar! Ingresa números del 1 al 9.");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <p
        className={`mb-4 text-lg font-medium ${board.flat().some((cell) => cell.isError) ? "text-red-600" : board.flat().every((cell) => cell.value !== null) && !board.flat().some((cell) => cell.isError) ? "text-green-600" : "text-gray-200"}`}
      >
        {message}
      </p>

      <SudokuBoard board={board} onCellChange={handleCellUpdate} />

      <div className="mt-6">
        <button
          onClick={handleNewGame}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
        >
          Reiniciar / Nuevo Puzzle
        </button>
      </div>
    </div>
  );
};
