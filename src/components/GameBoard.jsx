


export default function GameBoard({onSelectSquare, board}) {



    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         // with the help of that we can store previous array value in new Array
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];

    //         // with the help of that X is placed on correct index where user click
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;

    //     });
    //     onSelectSquare();
        
    // }
    return(
        <ol id="game-board">
        {board.map((row, rowIndex) => (
        <li key={rowIndex}>
        <ol>
            {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                    <button onClick={()=> onSelectSquare(rowIndex, colIndex)} 
                    disabled={playerSymbol !== null}>
                        {playerSymbol}
                    </button>    
                </li>
            ))}
        </ol>
        </li> ))}
    </ol>
    ) 
}