import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]


function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X';

      if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }      

    return currentPlayer;

}

function App() {
  
  const [players, setPlayers] = useState({
    X : 'Player 1',
    O : "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);

  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  // create a copy of an array and also create a copy of a nested array present inside the array 
  // with the help of that when we click on rematch button all things are removed starting from new because we create a copy we didn't manipulate the original array
  let gameBoard = [...initialGameBoard.map(array => [...array]) ];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }


  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol ===thirdSquareSymbol ){
        winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner; 
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer( (currActivePlayer)=> currActivePlayer ==='X' ? 'O' : 'X' );
    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{square: {row : rowIndex, col : colIndex}, player : currentPlayer}, ...prevTurns]

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
          /> 
          <Player initialName="Player 2" symbol="0" isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}
          />

        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} /> }
        <GameBoard onSelectSquare = {handleSelectSquare} board={gameBoard}/>
      </div>

      <Log turns={gameTurns}/>
    </main>
    
  )
}

export default App