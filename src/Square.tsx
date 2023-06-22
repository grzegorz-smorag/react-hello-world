import "./Square.css";

function Square({ value, onSquareClick, winner }) {
  return (
    <button className={`square ${winner ? 'winner' : ''}`} onClick={onSquareClick}>
      {value ? value : ' '}
    </button>
  );
}

export default Square;
