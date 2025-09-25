const GameBoard = (function(){
    let gameBoard = [["","",""],
                     ["","",""],
                     ["","",""]];

    const printBoard = function(){
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < gameBoard.length; j++ ) {
                console.log(gameBoard[j].join(" "));
            }
        }
    }

    const insertMove = function(){
        //write logic here
    }

    return {}
})();

const Players = (function(){
    const player1 = {
        name: "player1",
        moves: true,
    }

    const player2 = {
        name: "player2",
        moves: false,
    }

    return {}
})();

const GameFlow = (function(){


})();
