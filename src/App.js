import './App.css';
import {useState} from 'react';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard./ScoreBoard';




const  App = () => {
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X:0,
    O:0
  });


  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++){
      const [a,b,c] = winningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]){
        //hay un ganador

        endGame(newSquares[a], winningPositions[i]);
        return
      }
    }

    // si hay empate todos los cuadrados lleno es empate
    if(!newSquares.includes(null)){
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn); // en la posicion [] modifica un elemento y dale el valor de turn
    setSquares(newSquares)

    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => {
    setTurn(null);

    //no hubo empate
    if(result !== null){
      setScore({
        ...score,
        [result]: score[result] + 1
      })
    }
    setWinningSquares(winningPositions);

    // a los 2 segundos hace el reset
    setTimeout(reset, 2000);
  }


  return (
    <div className="container">
      <h1>Ta te ti</h1>
      <Board winningSquares={winningSquares} squares={squares} onClick={handleClick} turn={turn}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
