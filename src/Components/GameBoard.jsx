


 function GameBoard({onSelectSquare, board}) {

   
//   const [gameBoard, setGameBoard] = useState(board);
//   function boardHandler(rowIndex, colIndex) {
//     setGameBoard((prevBoard) => {
//       const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])];
//       updatedBoard[rowIndex][colIndex] = activeSquarePlayer;
//       return updatedBoard;
//     });
//     onSelectSquare()
//   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex, colIndex)} disabled={symbol!==null}> {symbol} </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard
