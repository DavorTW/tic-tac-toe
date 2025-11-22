const GameBoard = (function(){
    let gameBoard = [["","",""],
                     ["","",""],
                     ["","",""]];

    let numberOfMoves = 9;

    const getNumberOfMoves = () => {
        return numberOfMoves;
    }

    const resetNumberOfMoves = () => {
        numberOfMoves = 9;
    }


    const getGameBoard = () => gameBoard;

    const playMove = (row, column, token) => {
        if(gameBoard[row][column] === ""){
            numberOfMoves--;
            gameBoard[row][column] = token;
            return true;
        }else{
            return false;
        }
    }

    return {getGameBoard, playMove, getNumberOfMoves, resetNumberOfMoves}
})();

const Players = (function(){
    const player1 = {
        name: "Player 1",
        token: "X",
    }

    const player2 = {
        name: "Player 2",
        token: "O",
    }

    const players = [player1, player2];
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const resetActivePlayer = function() {
        activePlayer = players[0];
    }

    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        }else{
            activePlayer = players[0]
        };
        
        return activePlayer;
    }

    return {getActivePlayer, switchPlayer, resetActivePlayer}
})();

const GameFlow = (function(){

    const startGame = () => {
        UI.drawBoard();
        UI.startButton();
        UI.restarGame();
    }

    const checkWin = (playerName) => {
        const gameBoard = GameBoard.getGameBoard();
        //for rows
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]
                 && gameBoard[i][0] != ""){
                UI.showWinner(playerName);
                return true
            }
        }

        //for columns
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]
                && gameBoard[0][i] !== ""){
                    UI.showWinner(playerName);
                    return true;
            }
        }

        //for diagonals
        if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]
             && gameBoard[0][0] !== ""){
                UI.showWinner(playerName);
                return true

        }else if(gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
             && gameBoard[0][2] !== ""){
                UI.showWinner(playerName);
                return true
        }

        if (GameBoard.getNumberOfMoves() === 0) {
            console.log("It's a tie");
            return true;
        }
        
    }

    const resetBoard = function(){
        const board = GameBoard.getGameBoard();
        for (let i = 0; i < board.length; i++) {
            for(let j = 0; j < board.length; j++){
                board[i][j] = "";
            }
            
        }
    }

    return {startGame, checkWin, resetBoard}

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
                square.classList.add("disabled");
                square.dataset.row = i;
                square.dataset.column = j;
                gameBoardContainer.appendChild(square);
            }
        }
        UI.playerMoveHandler();
    }

    const playerMoveHandler = function () {
        const squares = document.querySelectorAll(".square");
        let gameOverStatus = false;
        squares.forEach((square) => {
                square.addEventListener("click", (e) => {

                    if (gameOverStatus) {
                        return;
                    }

                    const row = +e.target.dataset.row;
                    const column = +e.target.dataset.column;

                    const token = Players.getActivePlayer().token;
                    const playerName = Players.getActivePlayer().name;
                    if (GameBoard.playMove(row, column, token)) {
                        square.textContent = token;
                        if (GameFlow.checkWin(playerName)) {
                            gameOverStatus = true;
                            UI.disableBoard();
                        }
                        Players.switchPlayer();
                    }
                });
            
        });
    }

    const startButton = function(){
        const startButton = document.querySelector(".start");
        const squares = document.querySelectorAll(".square");
        
        startButton.addEventListener("click", ()=>{

            GameFlow.resetBoard();
            UI.clearSquares();
            GameBoard.resetNumberOfMoves();
            Players.resetActivePlayer();
            UI.removeWinnerText();

            squares.forEach(square => {
                square.classList.remove("disabled");
            });
        })
    }

    const clearSquares = function(){
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            if (square.classList.contains("disabled")) {
                square.classList.remove("disabled");
            }
            square.textContent = "";
        })
        UI.playerMoveHandler();
    }

    const removeWinnerText = function(){
        const winner = document.querySelector(".winner");
        if(winner){
            winner.remove();
        }
    }

    const restarGame = function() {
        const restartButton = document.querySelector(".restart");
        restartButton.addEventListener("click", ()=>{
            GameFlow.resetBoard();
            GameBoard.resetNumberOfMoves();
            Players.resetActivePlayer();
            UI.clearSquares();
            UI.removeWinnerText();
        })
    }

    const disableBoard = function(){
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.classList.add("disabled");
        })
    }

    const showWinner = function(playerName){
        const container = document.querySelector(".container");
        const winnerText = document.createElement("p");
        winnerText.classList.add("winner");
        winnerText.textContent = `${playerName} wins!`;
        container.appendChild(winnerText);
    }
        

    return {drawBoard, playerMoveHandler, startButton, disableBoard, clearSquares, restarGame, showWinner,removeWinnerText}
})();

GameFlow.startGame();
