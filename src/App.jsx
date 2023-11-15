import React from 'react'
import { useState } from 'react'
import './index.css'

const Square = ({value, num=0, onSquareClick}) => {
  return(
    <button
    id={`cell_${num}`}
    className={`square ${value ? (value === 'X' ? 'x-square' : 'o-square') : ''}`}
    onClick={onSquareClick}>
      {value}
      </button>
  )
}

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  const handleClick = (i) => {
    if (calculateWinner(squares) || !squares.includes(null)){
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  }

  return(
    <>
    <p className={winner === 'X' ? 'x-square' : 'o-square'}>{status}</p>
    <main className='game'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} num={1}></Square>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} num={3}></Square>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} num={7}></Square>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} num={9}></Square>
    </main>
    <section className='turns'>
        <Square value={'X'} num={xIsNext && 'actual'}></Square>
        <Square value={'O'} num={xIsNext || 'actual'}></Square>
    </section>
    </>
  )
}

export default App