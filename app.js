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

    const playMove = (row, column, token) => {
        if(gameBoard[row][column] === ""){
            gameBoard[row][column] = token;
            return true;
        }else{
            console.log("Position has already been chosen. Choose another position");
            return false;
        }
    }

    return {printBoard, getGameBoard, playMove}
})();

const Players = (function(){
    const player1 = {
        name: "player 1",
        token: "X",
    }

    const player2 = {
        name: "player 2",
        token: "O",
    }

    const players = [player1, player2];
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        }else{
            activePlayer = players[0]
        };
        
        return activePlayer;
    }

    return {getActivePlayer, switchPlayer}
})();

const GameFlow = (function(){

    const startGame = () => {
        console.log("Game Started!");
        playRound(0,0);
        playRound(0,1);
        playRound(0,2);
        playRound(1,0);
        playRound(1,1);
        playRound(1,2);
        playRound(2,0);
    }


    const playRound = (row,column) => {
        const token =  Players.getActivePlayer().token;
        const playerName = Players.getActivePlayer().name;
        console.log(`${playerName} plays`);
        if(GameBoard.playMove(row, column, token)){
            checkWin(playerName);
            Players.switchPlayer();
            GameBoard.printBoard();
        }else{
            console.log("Invalid round!");
        }
    }

    const checkWin = (playerName) => {
        const gameBoard = GameBoard.getGameBoard();
        //for rows
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]
                 && gameBoard[i][0] != ""){
                console.log(`${playerName} wins`);
            }
        }

        //for columns
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]
                && gameBoard[0][i] !== ""){
                    console.log(`${playerName} wins`);
                }
        }

        //for diagonals
        if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]
             && gameBoard[0][0] !== ""){
                console.log(`${playerName} wins`);
        }else if(gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
             && gameBoard[0][2] !== ""){
                console.log(`${playerName} wins`);
        }
        

    }

    return {startGame}

})();

GameFlow.startGame();
