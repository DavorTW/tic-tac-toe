const GameBoard = (function(){
    let gameBoard = [["","",""],
                     ["","",""],
                     ["","",""]];

    const printBoard = function(){
        for (let j = 0; j < gameBoard.length; j++ ) {
            console.log(gameBoard[j].join(" "));
        }
        
    }

    const getGameBoard = () => gameBoard;
    const insertMove = (row, column, token) => {

    }

    return {printBoard, getGameBoard}
})();

const Players = (function(){
    const player1 = {
        name: "player 1",
        token: 1,
    }

    const player2 = {
        name: "player 2",
        token: 2,
    }

    const players = [player1, player2];
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        }else(
            activePlayer = players[0]
        )
        
        return activePlayer;
    }

    return {getActivePlayer, switchPlayer}
})();

const GameFlow = (function(){

    const startGame = () => {
    
    }

    

    const playRound = () => {

    }


})();
