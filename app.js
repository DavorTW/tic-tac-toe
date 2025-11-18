const GameBoard = (function(){
    let gameBoard = [["","",""],
                     ["","",""],
                     ["","",""]];

    let numberOfMoves = 9;

    const getNumberOfMoves = () => {
        return numberOfMoves;
    }


    const getGameBoard = () => gameBoard;

    const playMove = (row, column, token) => {
        if(gameBoard[row][column] === ""){
            numberOfMoves--;
            gameBoard[row][column] = token;
            return true;
        }else{
            console.log("Invalid position. Choose another position");
            return false;
        }
    }

    return {getGameBoard, playMove, getNumberOfMoves}
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
        UI.drawBoard();
    }


    const playRound = (row,column) => {
        
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

        if (GameBoard.getNumberOfMoves() === 0) {
            console.log("It's a tie");
        }
        
    }

    return {startGame, checkWin}

})();

const UI = (function(){
    const drawBoard = function(){
        const board = GameBoard.getGameBoard();
        const gameBoardContainer = document.querySelector(".board");
        gameBoardContainer.textContent = "";
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                const square = document.createElement("DIV");
                square.classList.add("square");
                square.dataset.row = i;
                square.dataset.column = j;
                gameBoardContainer.appendChild(square);
            }
        }
    }

    const playerMoveHandler = function(){
        const squares = document.querySelectorAll(".square");
        const token =  Players.getActivePlayer().token;
        const playerName = Players.getActivePlayer().name;
        let row = null;
        let column = null;
        squares.forEach(square => {
            square.addEventListener("click", (e)=> {
                row = e.target.dataset.row;
                column = e.target.dataset.column;
                if(GameBoard.playMove(row, column, token)){
                    square.textContent = token;
                    GameFlow.checkWin(playerName);
                    Players.switchPlayer();
                    
                }else{
                    console.log("Invalid round!");
                }
            })
        });
    }

    return {drawBoard, playerMoveHandler}
})();

GameFlow.startGame();
UI.playerMoveHandler();