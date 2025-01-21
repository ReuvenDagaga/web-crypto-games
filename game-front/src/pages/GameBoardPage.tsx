import React, { useState, useEffect } from "react";
import "../styles/game.css";

const initialBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameOver) {
        if (
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
        ) {
          e.preventDefault(); // מונע את גלילת הדף
          switch (e.key) {
            case "ArrowUp":
              moveTiles("up");
              break;
            case "ArrowDown":
              moveTiles("down");
              break;
            case "ArrowLeft":
              moveTiles("left");
              break;
            case "ArrowRight":
              moveTiles("right");
              break;
            default:
              break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver]);

  const initializeGame = () => {
    let newBoard = initialBoard();
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard([...newBoard]);
  };

  const addNewTile = (currentBoard: number[][]) => {
    let emptyCells: { r: number; c: number }[] = [];
    currentBoard.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (cell === 0) emptyCells.push({ r: rIndex, c: cIndex });
      });
    });

    if (emptyCells.length > 0) {
      const { r, c } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentBoard[r][c] = Math.random() > 0.1 ? 2 : 4;
      setBoard([...currentBoard]);
    }
  };

  const slideRow = (row: number[]) => {
    let arr = row.filter((val) => val);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter((val) => val);
    while (arr.length < 4) arr.push(0);
    return arr;
  };

  const moveTiles = (direction: string) => {
    let newBoard = [...board];

    switch (direction) {
      case "left":
        newBoard = newBoard.map((row) => slideRow(row));
        break;
      case "right":
        newBoard = newBoard.map((row) => slideRow(row.reverse()).reverse());
        break;
      case "up":
        for (let col = 0; col < 4; col++) {
          let column = newBoard.map((row) => row[col]);
          column = slideRow(column);
          newBoard.forEach((row, rowIndex) => (row[col] = column[rowIndex]));
        }
        break;
      case "down":
        for (let col = 0; col < 4; col++) {
          let column = newBoard.map((row) => row[col]).reverse();
          column = slideRow(column).reverse();
          newBoard.forEach((row, rowIndex) => (row[col] = column[rowIndex]));
        }
        break;
      default:
        break;
    }

    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      addNewTile(newBoard);
      checkGameState(newBoard);
    }
  };

  const checkGameState = (board: number[][]) => {
    if (checkWin(board)) {
      alert("You Win!");
      setGameOver(true);
    } else if (checkGameOver(board)) {
      alert("Game Over!");
      setGameOver(true);
    }
  };

  const checkWin = (board: number[][]) => {
    return board.some((row) => row.includes(2048));
  };

  const checkGameOver = (board: number[][]) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) return false;
        if (col < 3 && board[row][col] === board[row][col + 1]) return false;
        if (row < 3 && board[row][col] === board[row + 1][col]) return false;
      }
    }
    return true;
  };

  return (
    <div className="game-container">
      <h1>2048 Game</h1>
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`tile ${cell ? "filled" : ""}`}>
                {cell !== 0 ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={initializeGame} className="reset-button">
        Restart Game
      </button>
    </div>
  );
};

export default GameBoard;
