import React from 'react';

import { Board } from './tic-tac-toe-board';
import { Square } from './tic-tac-toe-board';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    // This is defining history as: a 'shallow copy' of the history array,
    // copied inro a new array starting with zero and ending with the
    // stepNumber + 1. So clicking on the square with index 3 should set
    // history equal to an array with 0, 1, 2, 3, and 4 as the values.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // This defines current as the history slice array's length - 1
    const current = history[history.length - 1];
    // This defines squares as the
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  // getCoordinates = i => {
  //   switch(i) {
  //     case 0:
  //       return ['A', 1];
  //     case 1:
  //       return ['A', 2];
  //     case 2:
  //       return ['A', 3];
  //     case 3:
  //       return ['B', 1];
  //     case 4:
  //       return ['B', 2];
  //     case 5:
  //       return ['B', 3];
  //     case 6:
  //       return ['C', 1];
  //     case 7:
  //       return ['C', 2];
  //     case 8:
  //       return ['C', 3];
  //     default:
  //       return [null, null];
  //   }
  // }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // const numColumns = 3;
    // const cellIndex = {history[i] + 1};
    // let row = Math.floor(cellIndex / numColumns);
    // let col = (cellIndex % numColumns);
    // let moveCoordinates = ' (' + row + ',' + col + ')';

    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move
        : // + moveCoordinates
          'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
