import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log"
import { WINNING_COMBINATIONS } from "./Winning-combinations"
import GameOver from "./Components/GameOver"

const InitialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
 



function App() {
  const[gameTurns, setGameTurns] = useState([])
  const[activePlayer, setActivePlayer]=useState('X')

  let gameBoard = [...InitialBoard.map(array=>[...array])]
  for(const turn of gameTurns){
      const{square, player}=turn
      const{row,col}= square
      gameBoard[row][col]=player
  }
  let winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
 
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
  const hasDraw= gameTurns.length===9 && !winner


  function squareSelectHandler(rowIndex, colIndex){
    setActivePlayer((prevActive)=>(prevActive === 'X'? 'O':'X'))
    setGameTurns((prevTurns)=>{
      let currentPlayer= 'X'
      if(prevTurns.length>0 && prevTurns[0].player==='X'){
        currentPlayer = 'O'
      }
      const updatedTurns=[
        { square:{row:rowIndex, col:colIndex}, player:currentPlayer},
        ...prevTurns
      ]
      return updatedTurns
    })
  }

  function handleRematch(){
    setGameTurns([])
  }

  return(
    <div id="container">
    <div id="game-container">
      <ol id="players" className="highlight-player">
       <Player initialName='Player 1' symbol='X' isActive={activePlayer==='X'}/>
       <Player initialName='Player 2' symbol='O' isActive={activePlayer==='O'}/>
       
       </ol>
       {(winner || hasDraw) && <GameOver winner={winner} rematchHandler={handleRematch}/>}
       <GameBoard onSelectSquare={squareSelectHandler} 
       board={gameBoard}/>
       
    </div>
    <Log turns={gameTurns}/>  
    </div>
  )

  
}

export default App
