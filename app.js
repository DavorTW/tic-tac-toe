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
        UI.startButton();
    }

    const checkWin = (playerName) => {
        const gameBoard = GameBoard.getGameBoard();
        //for rows
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]
                 && gameBoard[i][0] != ""){
                console.log(`${playerName} wins`);
                return true
            }
        }

        //for columns
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]
                && gameBoard[0][i] !== ""){
                    console.log(`${playerName} wins`);
                    return true;
            }
        }

        //for diagonals
        if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]
             && gameBoard[0][0] !== ""){
                console.log(`${playerName} wins`);
                return true

        }else if(gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
             && gameBoard[0][2] !== ""){
                console.log(`${playerName} wins`);
                return true
        }

        if (GameBoard.getNumberOfMoves() === 0) {
            console.log("It's a tie");
            return true;
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
                square.classList.add("disabled");
                square.dataset.row = i;
                square.dataset.column = j;
                gameBoardContainer.appendChild(square);
            }
        }
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
            squares.forEach(square => {
                square.classList.remove("disabled");
            });
            playerMoveHandler();
        })
    }

    const disableBoard = function(){
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.classList.add("disabled");
        })
    }
        

    return {drawBoard, playerMoveHandler, startButton, disableBoard}
})();

GameFlow.startGame();
