import "./Board.css";
import Square from "./Square";

function Board({ xIsNext, squares, onPlay, currentMove }) {
  const winningIndexes = calculateWinningIndexes(squares);
  const status =
    currentMove === 9 && !winningIndexes
      ? "Result being a draw"
      : winningIndexes
      ? "Winner: " + squares[winningIndexes[0]]
      : "Next player: " + (xIsNext ? "X" : "O");
  const sqs = [0, 1, 2].map((rowIx) => {
    return (
      <div key={rowIx} className="board-row">
        {[0, 1, 2].map((colIx) => {
          const cellIx = rowIx * 3 + colIx;
          return (
            <Square
              key={cellIx}
              value={squares[cellIx]}
              onSquareClick={() => handleClick(cellIx)}
              winner={winningIndexes?.includes(cellIx)}
            ></Square>
          );
        })}
      </div>
    );
  });

  function handleClick(i: number) {
    if (calculateWinningIndexes(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div>You are at move #{currentMove}</div>
      {sqs}
    </>
  );

  function calculateWinningIndexes(squares: any[]) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i].slice();
      }
    }
    return null;
  }
}

export default Board;
