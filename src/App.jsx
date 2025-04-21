import React, { useState } from "react";
import "./App.css";

const Square = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 bg-white border-4 border-indigo-300 rounded-2xl text-4xl font-extrabold flex items-center justify-center shadow-md hover:bg-indigo-100 transition duration-200"
    >
      {value}
    </button>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : `Next player: ${xIsNext ? "❌" : "⭕"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300 flex flex-col items-center justify-center p-4">
      <div className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6">
        {status}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 shadow-lg transition duration-300"
      >
        🔄 Reset Game
      </button>
    </div>
  );
}

export default App;
