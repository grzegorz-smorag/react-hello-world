import { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [movesListAsc, setMovesListAsc] = useState(true);
  const [historyOfClicked, setHistoryOfClicked] = useState([]);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const moves = history.map((squares, move) => {
    const moveIx = movesListAsc ? move : history.length - move - 1;
    let description;
    if (moveIx > 0) {
      description = "Go to move #" + moveIx + " (" + historyOfClicked[move - 1].row + ", " + historyOfClicked[move -1].col + ")";
    } else {
      description = "Go to game start";
    }
    return (
      <li key={moveIx}>
        <button onClick={() => jumpTo(moveIx)}>{description}</button>
      </li>
    );
  });

  function handlePlay(nextSquares: any[], i: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setHistoryOfClicked([...historyOfClicked, {row: Math.floor(i / 3), col: i % 3}]);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
        ></Board>
      </div>
      <div className="game-info">
        <button onClick={() => setMovesListAsc(!movesListAsc)}>Switch order</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
