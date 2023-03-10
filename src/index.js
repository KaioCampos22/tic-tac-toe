import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
  const classes = 'square' + (props.winner ? ' winner' : '');
  return (
    <button
      className={classes}
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};
const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xTime, setXTime] = useState(true);
  const [winnerSquares, setWinnerSquares] = useState(null);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = xTime ? 'X' : 'O';
    setSquares(newSquares);
    setXTime(!xTime);
    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinnerSquares(winner);
      setTimeout(() => {
        alert(`O jogador ${winner} venceu!`);
        handleRestart();
      }, 500);
    }
  };
  const renderSquare = (i) => {
    const isWinnerSquare = winnerSquares && winnerSquares.includes(i);
    return (
      <Square
        value={squares[i]}
        winner={isWinnerSquare}
        onClickEvent={() => handleClick(i)}
      />
    );
  };
  const handleRestart = () => {
    setSquares(initialSquares);
    setXTime(true);
    setWinnerSquares(null);
  };


  const winner = calculateWinner(squares);
  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo Jogador: ${xTime ? 'X' : 'O'}`;
  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <button className='restart-button' onClick={handleRestart}>
        Reiniciar
      </button>
    </div>
  );
};
const Game = () => {
  return (
    <div className='game'>
      Jogo da Velha
      <Board />
    </div>
  );
};
ReactDOM.render(<Game />, document.getElementById('root'));
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
